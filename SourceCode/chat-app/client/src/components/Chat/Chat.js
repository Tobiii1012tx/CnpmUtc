import React, { useState, useEffect } from "react";
import {useLocation } from 'react-router-dom';

import {Messages} from '../Messages/Messages';
import {SideLeft} from '../SideLeft/sideleft';
import {SideRight} from '../SideRight/sideright';
// import { UserProvider } from '../Common/socket'

// import io from "socket.io-client";

import './Chat.css';
// let socket;
export const Chat = () => {
  const location = useLocation();
  let u = location.state.user[0];
  const [user, setUser] = useState(u);
  const [infoPage,setInfoPage] = useState({
    users : [],
    group : 0,
    messages : []
  })

  function ChooseGroup(groupId){
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({groupId})
    };
    fetch('http://localhost:5000/Message/GetMessage', requestOptions)
        .then(response => response.json())
        .then(data => {
              // setGroup(groupId)
              // setUsers(data.users)
              // setMessages(data.messages)
              setInfoPage({
                users : data.users,
                group: groupId,
                messages: data.messages
              })
        });
  }

  function AddMessage(msg){
      // console.log(infoPage)
      console.log(msg)
      setInfoPage({...infoPage,messages:[...infoPage.messages,msg]})
  }

  return (
      infoPage.group==0?(
        <div className="container-fluid">
        <div className="row">
          <SideLeft user = {user.Id} choosegroup = {(value)=> ChooseGroup(value)} />
        </div>
      </div>
      ):(
        <div className="container-fluid">
          <div className="row">
            <SideLeft user = {user.Id} choosegroup = {(value)=> ChooseGroup(value)} />
            <Messages addmsg = {(msg)=>{AddMessage(msg)}} group={infoPage.group} messages={infoPage.messages} userId={user.Id}/>
            <SideRight users = {infoPage.users}/>
          </div>
        </div>
      )
      
  );
}