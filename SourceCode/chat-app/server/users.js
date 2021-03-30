const users = [];

const addUser = ({ id, room,socketId }) => {
    room = room.trim();
    const existingUser = users.filter((user) =>user.id === id);
    // nếu không có trả về undefine
    // chưa có 
    if (existingUser.length == 0)
    {
        const user = { id, room,socketId };
        users.push(user);
        return [];
    }
    // có
    else{
        let index = users.findIndex((user) => user.room === room && user.id === id);
        users.splice(index, 1)[0];
        const user = { id, room,socketId };
        users.push(user);
        return existingUser;
    }
}

const removeUser = (id) => {
    let index = users.findIndex((user) => user.id == id);
    users.splice(index, 1);
    return true;
}

const getUser = (socketId) => users.filter((user) => user.socketId === socketId)[0];

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getUsers =() => users;
module.exports = { addUser, removeUser, getUser, getUsersInRoom ,getUsers};