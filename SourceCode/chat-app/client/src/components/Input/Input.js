import React,{useState} from 'react';

import 'font-awesome/css/font-awesome.min.css';

export const Input = ({sendMessage }) => {
    const [message, setMessage] = useState('');

    function Log(e){
        if(e.key==='Enter'){
            sendMessage(message); 
            setMessage('');
        }
        
    }


    return (
        <div className="main-bottom">
            <input 
            className="input form-control" 
            type="text" 
            placeholder="Type a message..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            onKeyPress={e => Log(e) }
            />
            <button className="sendButton btn" onClick={() => {sendMessage(message); setMessage('')}}><div><i className="fa fa-paper-plane" /></div></button>
        </div>
    )
}