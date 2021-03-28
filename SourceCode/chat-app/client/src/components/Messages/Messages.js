import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom'

import {Message} from './Message/Message'


export const Messages = (props) => {
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

        <div className="main-bottom">
            <div className="input-send">
                <input type="text" name="SendMessage" placeholder="Tin nhắn gửi đi...." className="form-control"/>
            </div>
        </div>
    </div>
    )
};