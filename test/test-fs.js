var fs = require("fs"),
    stream = require("../");

function read(source) {
  return source.slice(40).then(value => {
    if (value == null) return;
    process.stdout.write(value);
    return read(source);
  });
}

read(stream(fs.createReadStream("README.md")))
  .catch(error => console.error(error.stack));
