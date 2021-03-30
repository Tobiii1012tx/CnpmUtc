import React,{useEffect,useContext } from 'react';
import UserContext from "../../Common/socket"

export const SingleGroup = (props) => {
    // const ENDPOINT = 'https://react-chat-page.herokuapp.com/';
    //const socket = useContext(UserContext);
    // const JoinGroup = ()=>{
    //     socket.emit('join',props.group.Id, props.userId,(error) => {
    //         if(error) {
    //           console.log(error);
    //         }
    //     });
    // }

    return(
        <div className="group-item p-1" onClick={()=>{props.choosegroup(props.group.Id) }}>
            <div className="name-group d-flex">
                <p className="p-2 m-0">{props.group.Name}</p>
            </div>
        </div>
    )
};