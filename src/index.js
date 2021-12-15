const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
const port = process.env.PORT || 3000;

var path = require('path');
app.use(express.static(path.join(__dirname, '/')));
var i = 0;

io.on('connection', (socket) => {
    console.log("connected");
    console.log(socket);
    socket.on('message', (msg) => {
        console.log('message ' + msg);
        io.emit('message', `${socket.id} said ${msg}`);
    });
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
});

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
