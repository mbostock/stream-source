module.exports = function() {
  return new Promise((resolve, reject) => {
    this._readable
      .then(() => this._stream.once("close", () => resolve()).destroy())
      .catch((error) => reject(error));
  });
};
