import React, { useState } from 'react';
import {Redirect } from "react-router-dom";

import './Join.css';

export const Join = (props) => {
  const [email, setName] = useState('');
  const [password, setRoom] = useState('');

  function componentDidMount(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email : email, Password : password})
    };
    fetch('http://localhost:5000/User/Login', requestOptions)
        .then(response => response.json())
        .then(data => {
          // data là result trả về, thế cái trên alf cái call server (required đấy)
          if(data.length > 0) {
              console.log(data)
              props.history.push({pathname:"/chat",state:{user : data}});
          }
        });
  }
  // Cái chat của t nó bay đâu r, 
// Ông gửi ress là json giờ ô làm gì cho nó ra dl dl là gì
// Kiểu giờ ô muốn lấy ra name của th usẻ thì ô làm gì data.Name, thế thôi à ,json là key value thôi mà =)), tôi nhớ là phải sang object =))) k cần nó là obj rồi, bật thử đoạn demo t xem, cái cht ý, ô có lưu usẻ ở đâu k global ý
// empty dependency array means this effect will only run once (like componentDidMount in classes)
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Email" className="joinInput" type="email" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input placeholder="Password" className="joinInput mt-20" type="password" onChange={(event) => setRoom(event.target.value)} />
        </div>
           <button className={'button mt-20'} onClick={componentDidMount} type="submit">Sign In</button>
      </div>
    </div>
  );
}