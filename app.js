const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

const path = require("path");
// const { Socket } = require("socket.io");
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(PORT, () => {
    console.log(`server is running on port :${PORT}`);
});
const io = require('socket.io')(server);
io.on('connection', onConnected);
let socketSet = new Set();
function onConnected(socket) {
    console.log(socket.id);
    socketSet.add(socket.id);
    io.emit('clients-total', socketSet.size);
    socket.on('disconnect', () => {
        console.log('Socket Disconnected', socket.id);
        socketSet.delete(socket.id);
        io.emit('clients-total', socketSet.size);
    })
    socket.on('message', (data) => {
        console.log(data);
        socket.broadcast.emit('chat-message', data);
    })
    socket.on('feedback', (data) => {
        socket.broadcast.emit('feedback', data);
    })
}
