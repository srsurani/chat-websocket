var express = require('express');
var socket = require('socket.io');

//App Setup
var app = express();
var server = app.listen('8888', () => console.log('Listen to port 8888'));

//static file
app.use(express.static('public'));

//socket setup
var io = socket(server);

io.on('connect', (socket) => {
    console.log('socket connected made on', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})