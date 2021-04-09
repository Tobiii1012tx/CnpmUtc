var db = require('../model/db.js');

module.exports.GetMessage = async function(req, res) {
    let groupId = req.body.groupId;
    let sql = `select * from GroupUserMessage 
               join Users on GroupUserMessage.userId = Users.Id
               where GroupUserMessage.GroupId = ${groupId}`;
    let messages = await db.promise().query(sql);

    sql = `select * from GroupUser
            join Users on GroupUser.UserId = Users.Id
            where GroupUser.GroupId = ${groupId}`
    let users = await db.promise().query(sql);
    let value = {
        messages: messages[0],
        users: users[0]
    };
    res.status(200).send(value);
}


module.exports.SaveMessage = async function(Message,UserId,GroupId){
    let sql = `Insert into GroupUserMessage(GroupId,UserId,Message,ForUserId,Status) values(${GroupId},${UserId},N'${Message}',0,0)`;
    let query = await db.promise().query(sql);
    let check = query[0]["affectedRows"];
    if(check==1){
        sql = 'select * from Users where Id = '+UserId;
        return await db.promise().query(sql);
    }
    else{
        return false;
    }
}