const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


server.listen(2222, () => {
  console.log('listening on *:2222');
});


var Room = "Toller Talk";

io.on('connection', (socket) => {
  console.log('a user connected');
  

  

  socket.on('chat message', (msg) => {
    
    io.to(Room).emit('chat message',"[" + Room + "]" + msg);
  });

  socket.on('change Username',(newUsername) => {

    username = newUsername;

  });

  socket.on('change Room', (newRoom) => {
    Room = newRoom
    socket.join(Room);

  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
  
  