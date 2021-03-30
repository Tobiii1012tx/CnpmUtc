import React,{useState,useEffect,useContext} from 'react';
import ScrollToBottom from 'react-scroll-to-bottom'
import {Message} from './Message/Message'
import {Input} from '../Input/Input'
import io from 'socket.io-client'
let socket;
export const Messages = (props) => {
    const ENDPOINT = 'localhost:5000'
    socket = io.connect(ENDPOINT);
    socket.emit('join',props.group, props.userId,(error) => {
        if(error) {
            console.log(error);
        }
    })

    socket.on('TakeMessage',(message,groupId,userId) =>{
        console.log(message)
        let msg = {
            UserId : userId,
            Name : userId,
            Message : message
        }
        props.addmsg(msg)
    })

    const SendMessage = (msg)=>{
        if(msg) {
            socket.emit('sendMessage', msg,props.group,props.userId);
        }
    }

    return(
    <div className="col-md-6 main">
        <div className="main-header">
            <div className="p-3">
                <h5 className="mb-0"></h5>
                <span><small>Đang hoạt động</small></span>
            </div>
        </div>
        <ScrollToBottom className="main-content">
            {props.messages.map((message, i) => <div key={i}><Message message={message} userId={props.userId}/></div>)}
        </ScrollToBottom>
        <Input sendMessage={SendMessage} />
    </div>
    )
};