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



////////////////////////////////
// Chỉnh sửa biệt danh trong nhóm