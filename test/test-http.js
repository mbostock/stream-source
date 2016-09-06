var http = require("http"),
    stream = require("../");

function read(source) {
  return source.read().then((result) => {
    if (result.done) return;
    process.stdout.write(result.value);
    return read(source);
  });
}

http.request({
  hostname: "example.com",
  port: 80,
  path: "/",
  method: "GET"
}).on("response", (response) => {
  read(stream(response)).catch((error) => console.error(error.stack));
}).on("error", (error) => {
  console.error(error.stack);
}).end();
