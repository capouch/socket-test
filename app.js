// Set up server, hook on processors for sockets and files
var app = require('http').createServer(handler);
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(8000);

// This code responds to all requests with the same page
function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (client) {
    client.on('send_me_data', function (idx) {
        client.emit('you_have_data', idx, 'What you say there, Maynard?');
    });
});

