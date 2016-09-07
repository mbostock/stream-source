var stream = require("../");

function read(source) {
  return source.slice(40).then(value => {
    if (value == null) return;
    process.stdout.write(value);
    return read(source);
  });
}

read(stream(process.stdin))
  .catch(error => console.error(error.stack));
