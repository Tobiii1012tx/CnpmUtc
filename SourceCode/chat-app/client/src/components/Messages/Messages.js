import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import {Message} from './Message/Message'
import {Input} from '../Input/Input'
import { useSelector } from 'react-redux';
// import io from 'socket.io-client'
let socket;
export const Messages = (props) => {

    socket = useSelector(state=>state.socket)

    const GROUPID = props.group;
    socket.emit('join',props.group, props.userId,(error) => {
        if(error) {
            console.log(error);
        }
    })

    socket.on('TakeMessage',(message,_groupId,userId,UserName) =>{
        if(_groupId.toString() === GROUPID.toString()){
            let msg = {
                UserId : userId,
                Name : UserName,
                Message : message,
                CreatedDate : new Date().toLocaleString()
            }
            props.addmsg(msg)
        }
    })

    const SendMessage = (msg)=>{
        if(msg) {
            console.log(socket)
            socket.emit('sendMessage', msg ,GROUPID, props.userId);
        }
    }

    return(
    <div className="col-lg-6 col-md-7 main">
        <div className="main-header">
            <div className="p-2">
                <h5 className="mb-0">Tin nhắn trong nhóm</h5>
                <span><small className="text-success">Đang hoạt động</small></span>
            </div>
        </div>
        <ScrollToBottom className="main-content">
            {props.messages.map((message, i) => <div key={i}><Message message={message} userId={props.userId}/></div>)}
        </ScrollToBottom>
        <Input sendMessage={SendMessage} />
    </div>
    )
};