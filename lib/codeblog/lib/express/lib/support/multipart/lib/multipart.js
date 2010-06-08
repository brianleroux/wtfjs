
exports.lib = 
  { parse : require("./parse")
  , write : require("./write")
  };

exports.parser = exports.lib.parse.parser;
exports.writer = exports.lib.write.writer;
