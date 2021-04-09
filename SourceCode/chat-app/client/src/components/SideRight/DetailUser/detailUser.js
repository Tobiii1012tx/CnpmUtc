import React from "react";
export const DetailUser = (props) =>{
    return(
        <div className="user-detail p-1">
            <div className="name">
                <p className="m-0">{props.user.Name}</p>
            </div>
            <div className="email">
                <p className="m-0">{props.user.Email}</p>
            </div>
            <span className={props.user.RoleId === 0 ?"badge badge-success":props.user.RoleId===1?'badge badge-warning':"badge badge-primary" }>{props.user.RoleId === 0 ?"Chủ nhóm":props.user.RoleId===1?'Mod':"Thành viên" }</span>
        </div>
    )
}