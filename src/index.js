const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: ['http://localhost:4200', '*'],
      methods: ["GET", "POST"],
      credentials: true
    }
  });
const port = process.env.PORT | 8080;
var cors = require('cors');
app.use(cors());



io.on('connection', (socket) => {
    console.log("connected");
    socket.join(socket.id);
    socket.on('message', ({msg, roomName}, callback) => {
        console.log('message ' + msg + " roomName: " + roomName);
        const outgoingMessage = {
            name: socket.name,
            id: socket.id,
            msg
        };
        //socket.to(roomName).emit("message", outgoingMessage)
        const avatar = `https://avatars.dicebear.com/api/adventurer-neutral/${socket.id}.svg`
        io.to(roomName).emit('message', `<img src=${avatar} width='40px' alt='Nobody'/> ${msg}`);
    });
    socket.on('disconnect', () => {
        console.log('disconnected');
    });
    socket.on('join', (roomName) => {
        console.log('join: ' + roomName);
        socket.join(roomName);
    });
});


server.listen(port, () => {
    console.log(`Socket.IO server running at http://localhost:${port}/`);
});
