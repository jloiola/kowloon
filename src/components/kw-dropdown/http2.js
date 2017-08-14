
const http2 = require('http2');
const server = http2.createServer();

server.on('stream', (stream, requestHeaders) => {
  stream.respond({ ':status': 200, 'content-type': 'text/plain' });
  stream.write('hello ');
  stream.end('world');
});

server.listen(process.env['PORT']);
