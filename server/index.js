const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(process.env.PORT || 8080);

app.use('/', express.static('../build'));

app.get('/check', function (req, res) {
  res.send('ok');
});

let allClients = [];
io.on('connection', function (socket) {
  allClients.push(socket);
  socket.broadcast.emit('connections', allClients.length);
  socket.emit('connections', allClients.length);

  socket.on('send_message', function (data) {
    socket.broadcast.emit('new_message', data);
  });

  socket.on('disconnect', function() {
      const i = allClients.indexOf(socket);
      allClients.splice(i, 1);
      socket.broadcast.emit('connections', allClients.length);
  });
});
