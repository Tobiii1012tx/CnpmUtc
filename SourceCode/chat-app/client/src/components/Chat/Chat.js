import React, { useState, useEffect } from "react";
import { useHistory,useLocation } from 'react-router-dom';
import queryString from 'query-string';
import io from "socket.io-client";


import {InfoBar} from '../InfoBar/InfoBar';
import {Input} from '../Input/Input';
import {Messages} from '../Messages/Messages';
import {TextContainer} from '../TextContainer/TextContainer'

import {SideLeft} from '../SideLeft/sideleft';
import {SideRight} from '../SideRight/sideright';

import './Chat.css';

let socket;

export const Chat = () => {
  const location = useLocation();
  let u = location.state.user[0];
  const [user, setUser] = useState(u);
  const [messages,setMessages] = useState([])
  const [users,setUsers] = useState([])
  // const [name, setName] = useState('');
  // const [room, setRoom] = useState('');
  // const [users, setUsers] = useState('');
  // const [message, setMessage] = useState('');
  // const [messages, setMessages] = useState([]);
  // const ENDPOINT = 'https://react-chat-page.herokuapp.com/';


//   useEffect(() => {
//     const { name, room } = queryString.parse(location.search);

//     socket = io(ENDPOINT);

//     setRoom(room);
//     setName(name)

//     socket.emit('join', { name, room }, (error) => {
//       if(error) {
//         alert(error);
//       }
//     });
//   }, [ENDPOINT, location.search]);
  
//   useEffect(() => {
//     socket.on('message', message => {
//       setMessages(msgs => [ ...msgs, message ]);
//     });
    
//     socket.on("roomData", ({ users }) => {
//       setUsers(users);
//     });
// }, []);

//   const sendMessage = (event) => {
//     console.log(event);
//     event.preventDefault();

//     if(message) {
//       socket.emit('sendMessage', message, () => setMessage(''));
//     }
//   }
    function ChooseGroup(groupId){
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({groupId})
      };
      fetch('http://localhost:5000/Message/GetMessage', requestOptions)
          .then(response => response.json())
          .then(data => {
                setUsers(data.users)
                setMessages(data.messages)
                console.log(data)
          });
    }
  

  return (
    <div className="container-fluid">
      <div className="row">
        <SideLeft user = {user.Id} choosegroup = {(value)=> ChooseGroup(value)} />
        <Messages messages={messages} userId={user.Id}/>
        <SideRight users = {users}/>
      </div>
    </div>
  );
}