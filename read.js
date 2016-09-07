module.exports = function(length) {
  var that = this;
  return new Promise(function read(resolve, reject) {
    var buffer = that._stream.read(length);
    if (buffer != null) return resolve({value: buffer, done: false});
    return that._readable
        .then(function(done) { return done ? resolve({value: undefined, done}) : read(resolve, reject); })
        .catch(function(error) { return reject(error); });
  });
};
