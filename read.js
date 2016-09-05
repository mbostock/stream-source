module.exports = function(length) {
  var read = (resolve, reject) => {
    var buffer = this._stream.read(length);
    if (buffer != null) return resolve({value: buffer, done: false});
    this._readable
      .then((done) => done ? resolve({value: undefined, done}) : read(resolve, reject))
      .catch((error) => reject(error));
  };
  return new Promise(read);
};
