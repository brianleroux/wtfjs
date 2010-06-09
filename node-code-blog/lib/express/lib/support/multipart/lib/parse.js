
var sys = require("sys")
  , utils = require("./utils")
  , error = utils.error
  , emit = utils.emit
  , wrapExpression = /^[ \t]+/
  , multipartExpression = new RegExp(
    "^multipart\/(" +
    "mixed|rfc822|message|digest|alternative|" +
    "related|report|signed|encrypted|form-data|" +
    "x-mixed-replace|byteranges)", "i")
  , boundaryExpression = /boundary=([^;]+)/i
  , CR = "\r"
  , LF = "\n"
  , CRLF = CR+LF
  , MAX_BUFFER_LENGTH = 16 * 1024

// parser states.
var S = 0
exports.STATE =
  { NEW_PART : S++
  , HEADER : S++
  , BODY : S++
  };
for (S in exports.STATE) exports.STATE[exports.STATE[S]] = S;
S = exports.STATE;

// events for discoverability
exports.EVENTS = [ "onPartBegin", "onPartEnd", "onData", "onEnd", "onError" ];

exports.parser = function parser () { return new Parser() }
exports.Parser = Parser;

// the parser's "parts" object is a nested collection of the header objects
// check the parser's "part" member to know what it's currently chewin on.
// this.part.parent refers to that part's containing message (which may be
// the parser itself)
// child messages inherit their parent's headers
function Parser () {
  this.buffer = "";
  this.part = this;
  this.state = S.NEW_PART;
  // handy for debugging bad input
  this.position = this.column = this.line = 0;
  this.parent = this;
  this.type = this.headers = this.isMultiPart = this.boundary = null;
}

Parser.prototype.write = function (chunk) {
  // sys.debug("write: "+chunk);
  var parser = this
    , part = parser.part
  // write to the buffer, and then process the buffer.
  parser.buffer += chunk;

  while (parser.buffer) {
    switch (parser.state) {
      case S.NEW_PART:
        // part is a multipart message.
        // we're either going to start reading a new part, or we're going to
        // end the current part, depending on whether the boundary has -- at
        // the end.  either way, we expect --boundary right away.
        if (!parser.part.isMultiPart) {
          multipartHeaders(parser.part);
        }
        if (!parser.part.isMultiPart) {
          error(parser, "Expected multipart message (did you set the headers?)");
        }
        var boundary = parser.part.boundary
          , len = boundary.length
          , offset = parser.buffer.indexOf(boundary)
        if (offset === -1) {
          if (parser.buffer.length > len) {
            error(parser, "Malformed: boundary not found at start of message");
          }
          // keep waiting for it.
          return;
        }
        if (offset > 0) {
          error(parser, "Malformed: data before the boundary");
          return;
        }
        if (parser.buffer.length < (len + 2)) {
          // we'll need to see either -- or CRLF after the boundary.
          // get it on the next pass.
          return;
        }
        if (parser.buffer.substr(len, 2) === "--") {
          // this message is done.
          // chomp off the boundary and crlf and move up
          if (parser.part !== parser) {
            // wait to see the crlf, unless this is the top-level message.
            if (parser.buffer.length < (len + 4)) return;
            if (parser.buffer.substr(len+2, 2) !== CRLF) {
              error(parser, "Malformed: CRLF not found after boundary");
              return;
            }
          }
          parser.buffer = parser.buffer.substr(len + 4);
          emit(parser, "onPartEnd", parser.part);
          parser.part = parser.part.parent;
          parser.state = S.NEW_PART;
          continue;
        }
        if (parser.part !== parser) {
          // wait to see the crlf, unless this is the top-level message.
          if (parser.buffer.length < (len + 2)) return;
          if (parser.buffer.substr(len, 2) !== CRLF) {
            error(parser, "Malformed: CRLF not found after boundary");
            return;
          }
        }
        // walk past the crlf
        parser.buffer = parser.buffer.substr(len + 2);
        // mint a new child part, and start parsing headers.
        parser.part = startPart(parser.part);
        parser.state = S.HEADER;
      continue;
      case S.HEADER:
        // just grab everything to the double crlf.
        var headerEnd = parser.buffer.indexOf(CRLF+CRLF)
        if (headerEnd === -1) {
          if (parser.buffer.length > MAX_BUFFER_LENGTH) {
            error(parser, "Malformed: header unreasonably long.");
          }
          return;
        }
        var headerString = parser.buffer.substr(0, headerEnd)
        parseHeaderString(parser.part.headers, headerString, parser);
        // chomp off the header and the empty line.
        parser.buffer = parser.buffer.substr(headerEnd + 4);
        multipartHeaders(parser.part);

        // let the world know
        emit(parser, "onPartBegin", parser.part);

        if (parser.part.isMultiPart) {
          // it has a boundary and we're ready to grab parts out.
          parser.state = S.NEW_PART;
        } else {
          // it doesn't have a boundary, and is about to
          // start spitting out body bits.
          parser.state = S.BODY;
        }
      continue;
      case S.BODY:
        // look for parser.part.parent.boundary
        var boundary = parser.part.parent.boundary
          , offset = parser.buffer.indexOf(boundary)
        if (offset === -1) {
          // emit and wait for more data, but be careful, because
          // we might only have half of the boundary so far.
          // make sure to leave behind the boundary's length, so that we'll
          // definitely get it next time if it's on its way.
          var emittable = parser.buffer.length - boundary.length
          if (parser.buffer.substr(-1) === CR) emittable -= 1;
          if (parser.buffer.substr(-2) === CRLF) emittable -= 2;

          if (emittable > 0) {
            emit(parser, "onData", parser.buffer.substr(0, emittable));
            parser.buffer = parser.buffer.substr(emittable);
          }
          // haven't seen the boundary, so wait for more bytes.
          return;
        }
        if (offset > 0) {
          var emittable = parser.buffer.substr(0, offset)
          if (emittable.substr(-2) === CRLF) {
            emittable = emittable.substr(0, emittable.length-2);
          }
          if (emittable) emit(parser, "onData", emittable);
          parser.buffer = parser.buffer.substr(offset);
        }

        // let em know we're done.
        emit(parser, "onPartEnd", parser.part);

        // now buffer starts with boundary.
        if (parser.buffer.substr(boundary.length, 2) === "--") {
          // message end.
          // parent ends, look for a new part in the grandparent.
          parser.part = parser.part.parent;
          emit(parser, "onPartEnd", parser.part);
          parser.part = parser.part.parent;
          parser.state = S.NEW_PART;
          parser.buffer = parser.buffer.substr(boundary.length + 4);
        } else {
          // another part coming for the parent message.
          parser.part = parser.part.parent;
          parser.state = S.NEW_PART;
        }
      continue;
    }
  }
}

Parser.prototype.close = function () {
  emit(this, "onEnd");
  Parser.call(this);
}

function parseHeaderString (headers, string, parser) {
  var lines = string.split(CRLF)
    , field, value, line
  for (var i = 0, l = lines.length; i < l; i ++) {
    line = lines[i];
    if (line.match(wrapExpression)) {
      if (!field) {
        error(parser, "Malformed. First header starts with whitespace.");
      }
      value += line.replace(wrapExpression, " ");
      continue;
    } else if (field) {
      // now that we know it's not wrapping, put it on the headers obj.
      affixHeader(headers, field, value);
    }
    line = line.split(":");
    field = line.shift().toLowerCase();
    if (!field) {
      error(parser, "Malformed: improper field name.");
    }
    value = line.join(":").replace(/^\s+/, "");
  }
  // now affix the last field.
  affixHeader(headers, field, value);
}

function affixHeader (headers, field, value) {
  if (!headers.hasOwnProperty(field)) {
    headers[field] = value;
  } else if (Array.isArray(headers[field])) {
    headers[field].push(value);
  } else {
    headers[field] = [headers[field], value];
  }
}

function startPart (parent) {
  return { headers : {}
         , parent : parent
         };
}

// check the headers of a message.  If it wants to be multipart,
// then we'll be returning true, and setting some additional data,
// like type and boundary.
function multipartHeaders (message) {
  // if it has a boundary already, then it's most likely the parser object,
  // and the user has told us what they expect the boundary to be.
  // take their word for it.
  if (message.boundary) {
    if (message.boundary.substr(0, 2) !== "--") {
      message.boundary = "--" + message.boundary;
    }
    return message.isMultiPart = true;
  }

  var field
    , val
    , contentType
    , contentDisposition = ""
  for (var h in message.headers) if (message.headers.hasOwnProperty(h)) {
    val = message.headers[h];
    field = h.toLowerCase();
    if (field === "content-type") {
      contentType = val;
    } else if (field === "content-disposition") {
      contentDisposition = val;
    }
  }

  if (!Array.isArray(contentDisposition)) {
    contentDisposition = contentDisposition.split(",");
  }
  contentDisposition = contentDisposition[contentDisposition.length - 1];

  // Name and filename can come along with either content-disposition
  // or content-type.  Well-behaved agents use CD rather than CT,
  // but sadly not all agents are well-behaved.
  [contentDisposition, contentType].forEach(function (h) {
    if (!h) return;
    var cd = h.split(/; */)
    cd.shift();
    for (var i = 0, l = cd.length; i < l; i ++) {
      var bit = cd[i].split("=")
        , name = bit.shift()
        , val = stripQuotes(bit.join("="))
      if (name === "filename" || name === "name") {
        message[name] = val;
      }
    }
  });

  if (!contentType) return false;

  if (!Array.isArray(contentType)) contentType = contentType.split(",");
  contentType = contentType[contentType.length-1];

  // make sure it's actually multipart.
  var mpType = multipartExpression.exec(contentType)
  if (!mpType) return false;

  // make sure we have a boundary.
  var boundary = boundaryExpression.exec(contentType)
  if (!boundary) return false;

  message.type = mpType[1];
  message.boundary = "--" + boundary[1];
  message.isMultiPart = true;
  return true;
}

function stripslashes(str) {
  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // +   improved by: Ates Goral (http://magnetiq.com)
  // +      fixed by: Mick@el
  // +   improved by: marrtins
  // +   bugfixed by: Onno Marsman
  // +   improved by: rezna
  // +   input by: Rick Waldron
  // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
  // *     example 1: stripslashes("Kevin\'s code");
  // *     returns 1: "Kevin's code"
  // *     example 2: stripslashes("Kevin\\\'s code");
  // *     returns 2: "Kevin\'s code"
  return (str+"").replace(/\\(.?)/g, function (s, n1) {
    switch(n1) {
      case "\\":
        return "\\";
      case "0":
        return "\0";
      case "":
        return "";
      default:
        return n1;
    }
  });
}
function stripQuotes (str) {
  str = stripslashes(str);
  return str.substr(1, str.length - 2);
}
