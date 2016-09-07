module.exports = function(length) {
  if (length != null && (length |= 0) < 0) throw new Error("invalid length");
  var that = this, stream = this._stream;
  return new Promise(function read(resolve, reject) {
    if (length === 0) return resolve(stream.destroyed ? {done: true, value: undefined} : {done: false, value: new Buffer(0)});
    var buffer = stream.read(length);
    if (buffer != null) return resolve({done: false, value: buffer});
    return that._readable
        .then(function(done) { return done ? resolve({done: done, value: undefined}) : read(resolve, reject); })
        .catch(function(error) { return reject(error); });
  });
};
