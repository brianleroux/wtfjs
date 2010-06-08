
exports.emit = emit;
exports.error = error;

function error (emitter, message) {
  emitter.error = new Error(message);
  emit(emitter, "onError", emitter.error);
  if (emitter.error) throw emitter.error;
}
function emit (emitter, ev, data) {
  if (emitter[ev]) emitter[ev](data);
  else if (emitter[ev.toLowerCase()]) emitter[ev.toLowerCase()](data);
}
