import React,{useState} from 'react';

import 'font-awesome/css/font-awesome.min.css';

export const Input = ({sendMessage }) => {
    const [message, setMessage] = useState('');
    return (
        <div className="main-bottom">
            <input 
            className="input form-control" 
            type="text" 
            placeholder="Type a message..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' ? ()=>{sendMessage(message); setMessage('');} : null }
            />
            <button className="sendButton btn" onClick={() => {sendMessage(message); setMessage('')}}><div><i className="fa fa-paper-plane" /></div></button>
        </div>
    )
}