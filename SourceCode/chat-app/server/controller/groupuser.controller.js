var db = require('../model/db.js');


// check roles
async function GetRoleOfUser(groupUserId){
    let sql = `select * from GroupUser where Id = ${groupUserId}`;
    let res = await db.promise().query(sql);
    let arr = res[0];
    return arr[0]["RoleId"];
}

////////////////////////////////
// thêm mới người dùng vào nhóm
module.exports.AddUser = async function(req,res){
    let user = req.body;
    // get role of user add
    let RoleCreateBy = await GetRoleOfUser(user.CreateBy);
    if(RoleCreateBy < 2){
        let sql =  `insert into groupuser (GroupId,UserId,Name,RoleId,CreateBy,CreateDate,Status) 
                        value(${user.GroupId},${user.UserId},'Thành viên',2,${user.CreateBy},'${ new Date().toJSON().slice(0, 10) }',${true})`;
        let result = await db.promise().query(sql);
        let check = result[0]["affectedRows"]
        if(check==1){
            res.send(true);
        }
        else{
            res.send(false);
        }
    }
    else{
        res.status(200).send(false);
    }
}



////////////////////////////////
// xóa người dùng trong nhóm
module.exports.DeleteUser = async function(req,res){
    let user = req.body;
    let sql = `delete from groupuser where id = ${user.Id}`;
    let role = await GetRoleOfUser(user.deleteBy);
    if(role<2 || user.deleteBy == user.Id){
        let response = await db.promise().query(sql);
        let check = response[0]["affectedRows"] == 1?true:false;
        res.send(check);
    }
    res.send(false);
}



////////////////////////////////
// set quyền cho người dùng
module.exports.SetRoleUser = async function(req,res){
    let user = req.body;
    let sql = `update groupuser where RoleId = ${user.RoleId}`;
    let role = await GetRoleOfUser(user.setBy);
    if(role<2){
        let response = await db.promise().query(sql);
        let check = response[0]["affectedRows"] == 1?true:false;
        res.send(check);
    }
    res.send(false);
}



module.exports.AddMember =async function(user) {
    let getUser = await FindUser(user.Email);
    if (getUser.length > 0) {
        if (await CheckUser(getUser[0]["Id"],user.GroupId)) {
            let UserId = getUser[0]["Id"];
            let sql =  `insert into groupuser (GroupId,UserId,Name,RoleId,CreateDate,Status) 
                        value(${user.GroupId},${UserId},'Thành viên',2,'${new Date().toJSON().slice(0, 10) }',${true})`;
                    var query = await db.promise().query(sql);
                    return getUser[0]; 
        }
        else{
            return false;
        }
    }
    else {
        return false;   
    }
}

async function FindUser(email) {
        sql =  `select * from Users where Email ='${email}'`;
        var query = await db.promise().query(sql);
        let check = query[0];   
        return (check);
}
async function CheckUser(userId,GroupId){
    sql =  `select * from GroupUser where UserId =${userId} and GroupId=${GroupId}`;
    var query = await db.promise().query(sql);
    let check = query[0];  
    return (check.length==0);
}


module.exports.Leave =async function(user) {
    let query = await  db.promise().query(`delete From GroupUser Where UserId = ${user.UserId} and GroupId = ${user.GroupId}`);
    return await db.promise().query(`select * from appchat.group where Id = ${user.GroupId} limit 1`);
}