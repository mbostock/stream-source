var http = require("http"),
    stream = require("../");

function read(source) {
  return source.slice(40).then(value => {
    if (value == null) return;
    process.stdout.write(value);
    return read(source);
  });
}

http.request("http://example.com")
  .on("response", response => read(stream(response)).catch(error => console.error(error.stack)))
  .on("error", error => console.error(error.stack))
  .end();
