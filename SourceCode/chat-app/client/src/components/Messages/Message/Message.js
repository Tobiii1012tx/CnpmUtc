import React from 'react';

// import ReactEmoji from 'react-emoji'

export const Message = (props) => {
    let isSentByCurrentUser = false;
    // Bật mấy cái component truyềnuuserid xuống t xem phát
    if(props.userId === props.message.UserId) {
        isSentByCurrentUser = true
    }

    return (
    isSentByCurrentUser
    ? (
        <div className="my-message p-1 d-flex justify-content-end">
            <div className="content">
                <p className="p-2 text-white message" data-toggle="tooltip" data-placement="top" title={new Date(props.message.CreatedDate).toLocaleString()}>{props.message.Message}</p>
            </div>
        </div>
    )
    : (
        <div className="other-message p-1 d-flex justify-content-start">
            <div className="content">
                <p className="pl-2 description">{props.message.Name.split(' ')[props.message.Name.split(' ').length - 1]}</p>
                <p className="p-2 message"  data-toggle="tooltip" data-placement="top"  title={new Date(props.message.CreatedDate).toLocaleString()}>{props.message.Message}</p>
            </div>
        </div>
    ) 
    )

};