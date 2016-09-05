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

function promise(source) {
  return new Promise((resolve, reject) => {
    source._resolve = resolve;
    source._reject = reject;
  });
}

StreamSource.prototype.read = function() {
  var read = (resolve, reject) => {
    var buffer = this._stream.read();
    if (buffer != null) return resolve(buffer);
    this._readable
      .then((end) => end ? resolve(null) : read(resolve, reject))
      .catch((error) => reject(error));
  };
  return new Promise(read);
};

StreamSource.prototype.cancel = function() {
  return new Promise((resolve, reject) => {
    this._readable
      .then(() => this._stream.once("close", () => resolve()).destroy())
      .catch((error) => reject(error));
  });
};
