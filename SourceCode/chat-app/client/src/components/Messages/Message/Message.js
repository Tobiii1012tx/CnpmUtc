import React from 'react';

import ReactEmoji from 'react-emoji'

export const Message = (props) => {
    let isSentByCurrentUser = false;
    // Bật mấy cái component truyềnuuserid xuống t xem phát
    if(props.userId == props.message.UserId) {
        isSentByCurrentUser = true
    }

    return (
    isSentByCurrentUser
    ? (
        <div className="my-message p-3 d-flex justify-content-end">
            <div className="w-50 content">
                <p className="description">{props.message.Name} | 11:00 pm</p>
                <p className="p-2 text-white message">{props.message.Message}</p>
            </div>
        </div>
    )
    : (
        <div className="other-message p-3 d-flex justify-content-start">
            <div className="w-50 content">
                <p className="description">{props.message.Name} | 11:00 pm</p>
                <p className="p-2 message">{props.message.Message}</p>
            </div>
        </div>
    ) 
    )

};