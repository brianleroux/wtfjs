// This API should be a symmetrical mirror of the writer API in writer.js
// Instead of having onpartbegin and onpartend events, call the partBegin
// and partEnd methods, and write file contents.  Then, the writer emits
// "data" events with chunks of data suitable for sending over the wire.
// That is, it converts the data objects into one big string.

// var w = writer();
// w.boundary = "foo-bar-bazfj3980haf38h";
// w.type = "form-data";
// w.headers = {...};
// w.partBegin({...}); // send the headers, causes the initial "data" event to emit
// w.write("..."); // encode the data, wrap it, etc., and emit more "data" events
// w.partEnd(); // close off that part, emitting a "data" event with the --boundary
// w.partBegin({...}); // another part...
// w.partBegin({...}); // if the last one was multipart, then do a child, else error.
// w.partEnd(); // close off that child part
// w.partEnd(); // close off the parent
// w.close(); // close off all open parts, and emit "end" event

var sys = require("sys"),
  utils = require("./utils"),
  error = utils.error,
  emit = utils.emit,
  EVENTS = exports.EVENTS = ["onData", "onEnd", "onError"];

var S = 0;
exports.STATE =
  { STARTED : S++  //nothing received
	, PART_STARTED : S++ // a part header was written
  , WRITING : S++  // client is writing a part
	, PART_ENDED : S++ // a end part was written
  , CLOSED : S++ // close was called
  };
for (S in exports.STATE) exports.STATE[exports.STATE[S]] = S;
S = exports.STATE;

exports.writer = writer;
exports.Writer = Writer;

function NYI () { throw new Error("Not yet implemented") }

// Returns a new writer.
// Attaches event handlers to it, and they'll get notified
// call myWriter.write(chunk) and then myWriter.close() when it's done.
function writer () { return new Writer() }

function end (writer) {
  // close the whole stack of open parts, and emit "end"
  throw new Error("TODO");
}
function newPart (writer) {
  var p = 
    { headers:{}
    , parent : writer.part
    };
  parent.parts = parent.parts || [];
  parent.parts.push(p);
}

function Writer () {
	this.firstPartReceived = false;
	this.state = S.STARTED;
}


// Writes a chunk to the multipart stream 
// Sets error if not called after a partBegin
Writer.prototype.write = write;	
function write (chunk) {
  var writer = this;
	//ye old state machine
	if (chunk === null) return;
	if (writer.state !== S.PART_STARTED) {
		error(writer, "Illegal state.  Must call partBegin before writing.");
		return; 
	}
	// TODO - encode the data if base64 content-transfer-encoding
	emit(writer, "onData", chunk);
}

Writer.prototype.close = NYI;

// Starts a part or nested part.
// Emits data events to listeners with headers for part.
// If first part, will emit http headers plus headers of first part.
// Sets error if part is added to a part of type other than multipart,
// or if new part is started before the old one is written correctly.
//
// Params: object describing header for event
// e.g. { "content-type" : "text/plain", filename : "foo.txt" }
Writer.prototype.partBegin = partBegin;
function partBegin (partDesc) {
	var writer = this;
	if (!writer.boundary || writer.boundary.length < 1) {
		error(writer, "Missing boundary. Set boundary property.");
		return;
	}
	if (writer.state !== S.STARTED && writer.state !== S.PART_ENDED) {
		error(writer, "Illegal state. Cannot begin new part right now.");
		return;		
	}
	else if (this.currentPart && !isMulti(this.currentPart)) {
		error(writer, "Bad format. Cannot add part to non multipart parent.");
		return;
	} else {
		// TODO - check for invalid state before adding the new part
		//newPart(writer);
		partChunk = "";
		if (!writer.firstPartReceived) {
			//write the http headers
		}
		// TODO - encode part headers based on partDesc
		emit(writer, "onData", "TODO: encoded chunk");
	}
}

Writer.prototype.partEnd = NYI;

