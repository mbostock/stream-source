# stream-source

A [readable stream reader](https://streams.spec.whatwg.org/#readable-stream-reader) implementation on top of a Node [readable stream](https://nodejs.org/api/stream.html#stream_class_stream_readable). This library allows you to write code that takes a *reader* as input, and can work with either native readable streams or Node streams. For example:

```js
var stream = require("stream-source");

function read(source) {
  return source.read().then((result) => {
    if (result.done) return;
    process.stdout.write(result.value);
    return read(source);
  });
}

read(stream.source(process.stdin))
  .catch((error) => console.error(error.stack));
```

## API Reference

<a name="source" href="#source">#</a> stream.<b>source</b>(<i>stream</i>) [<>](https://github.com/mbostock/stream-source/blob/master/index.js#L1 "Source")

Returns a *source* for the specified node *stream*.

<a name="source_read" href="#source_read">#</a> <i>source</i>.<b>read</b>([<i>length</i>]) [<>](https://github.com/mbostock/stream-source/blob/master/read.js "Source")

Returns a Promise for the next chunk of data from the underlying stream. The yielded result is an object with the following properties:

* `value` - a [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) (a [Buffer](https://nodejs.org/api/buffer.html)), or undefined if the stream ended
* `done` - a boolean which is true if the stream ended

If an optional *length* is specified, the promise will be yielded with a *value* of *length* bytes, or the remaining bytes of the underlying stream if the underlying stream has more than zero but fewer than *length* bytes remaining. When no bytes remain in the stream, the yielded *value* will be undefined, and *done* will be true.

<a name="source_cancel" href="#source_cancel">#</a> <i>source</i>.<b>cancel</b>() [<>](https://github.com/mbostock/stream-source/blob/master/cancel.js "Source")

Returns a Promise which is resolved when the underlying stream has been destroyed.
