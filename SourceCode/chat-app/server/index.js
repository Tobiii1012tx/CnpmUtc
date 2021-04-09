const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');
const { addUser, removeUser, getUser, getUsersInRoom ,getUsers} = require('./users');

const User = require('./controller/message.controller')
const GroupUser = require('./controller/groupuser.controller')
const Group = require('./controller/group.controller')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
    socket.on('join', (groupId,userId,callback) => {
        let keyGroup = 'Group'+groupId;
        let check = addUser({id:userId, room : keyGroup, socketId:socket.id});
        if (check) {
            socket.join(keyGroup);
        }
        // console.log(io.sockets.adapter.rooms[keyGroup])
        callback();
    });

    // gửi tin nhắn
    socket.on('sendMessage',(message,groupId,userId) => 
    { 
        User.SaveMessage(message,userId,groupId).then(result =>{
            if(result != false){
                let keyGroup = 'Group'+groupId;
                io.in(keyGroup).emit('TakeMessage', message,groupId,userId,result[0]["Name"]);
            }
        });
       
    })


    // thêm thành viên
    socket.on('AddMember', user => 
    { 
        GroupUser.AddMember(user).then(result =>{
                let keyGroup = 'Group'+user.GroupId;
                io.to(`${socket.id}`).emit('ResponseAddMember',result);
                if (result != false) {
                    // send to group
                    socket.to(keyGroup).emit('NewMember',result);

                    // send to new member
                    let userCheck = getUsers().filter(x=>x.id===result.Id && x.room === keyGroup)
                    if(userCheck.length>0)
                    {
                        Group.GetGroupById(user.GroupId).then(result=>{
                            console.log(userCheck[0].socketId)
                            io.to(`${userCheck[0].socketId}`).emit('AddToGroup',result);
                        })
                    }
                }
        });
    })

    socket.on('Leave', data=> {
        console.log(data)
        GroupUser.Leave(data).then(result=>{
            io.to(`${socket.id}`).emit('LeaveSuccess',result[0]);
        });
    });

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