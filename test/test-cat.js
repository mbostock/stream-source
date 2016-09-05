var stream = require("../");

function read(source) {
  return source.read().then((result) => {
    if (result.done) return;
    process.stdout.write(result.value);
    return read(source);
  });
}

read(stream.source(process.stdin))
  .catch((error) => console.error(error.stack));
