var fs = require("fs"),
    stream = require("./");

var source = stream(fs.createReadStream("test.bin"));

function repeat() {
  return source.read().then((chunk) => {
    if (chunk == null) return;
    console.log(chunk);
    return repeat();
  });
}

repeat().catch((error) => console.error(error.stack));
