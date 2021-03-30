const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom ,getUsers} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    socket.on('join', (groupId,userId,callback) => {
        let keyGroup = 'Group'+groupId;
        const oldConnect =  addUser({id:userId, room : keyGroup, socketId:socket.id});
        console.log("ket noi cu")
        console.log(oldConnect)
        // disconect to old connect
        if (oldConnect.length > 0) {
            oldConnect.forEach(x=>{
                io.sockets.connected[x.socketId].disconnect();
            })
        }

        socket.join(keyGroup);
        // console.log(io.sockets.adapter.rooms[keyGroup])
        callback();
    });

    socket.on('sendMessage',(message,groupId,userId) => 
    { 
        let keyGroup = 'Group'+groupId;
        io.in(keyGroup).emit('TakeMessage', message,groupId,userId);
    })

    socket.on('error', function (err) {
        console.log(err);
    });

    socket.on('disconnect', () => {
        let user = getUser(socket.id);
        if (user!=undefined) {
             removeUser(user.id)
        }
    })
});
server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));