const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 3000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})



// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// const PORT = process.env.PORT || 3000;

// app.use(express.static(__dirname));

// io.on('connection', (socket) => {
//     socket.on('message', (msg) => {
//         io.emit('message', msg);
//     });

//     socket.on('deleteMessage', (messageId) => {
//         // Implement message deletion logic here, ensuring it respects permissions.
//         // Once the message is deleted, emit an event to notify clients.
//         io.emit('messageDeleted', messageId);
//     });
// });

// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });


