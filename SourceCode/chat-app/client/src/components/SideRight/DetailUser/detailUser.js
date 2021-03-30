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
        </div>
    )
}