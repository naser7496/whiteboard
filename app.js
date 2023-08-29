const express = require('express')
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

//serve static files
app.use(express.static('public'))

io.on('connection', (socket)=>{
    console.log('A user connected')

    //Broadcast clients drawing data to all clients except for sender
    socket.on('draw',(data)=>{
        socket.broadcast.emit('draw', data);
    });

    socket.on('disconnect',()=>{
        console.log('A user disconnected');
    });
});

//start the server
const port = process.env.PORT || 4000;
server.listen(port, ()=>{
    console.info(`server dare run mishe rouye ${port}`)
});
