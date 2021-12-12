const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const port = process.env.PORT || 8080;

var path = require('path');
app.use(express.static(path.join(__dirname, '/')));

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
