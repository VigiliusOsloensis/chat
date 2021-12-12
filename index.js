const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var path = require('path');
app.use(express.static(path.join(__dirname, '/')));

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message ' + msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
