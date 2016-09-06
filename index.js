module.exports = function(stream) {
  return new StreamSource(stream);
};

function StreamSource(stream) {
  this._readable = promise(this);
  this._stream = stream.on("readable", () => {
    var resolve = this._resolve;
    this._readable = promise(this);
    resolve(false);
  }).on("end", () => {
    var resolve = this._resolve;
    this._readable = Promise.resolve(true);
    resolve(true);
  }).on("error", (error) => {
    var reject = this._reject;
    this._readable = Promise.reject(error);
    reject(error);
  });
}

StreamSource.prototype.read = require("./read");
StreamSource.prototype.cancel = require("./cancel");

function promise(source) {
  return new Promise((resolve, reject) => {
    source._resolve = resolve;
    source._reject = reject;
  });
}
