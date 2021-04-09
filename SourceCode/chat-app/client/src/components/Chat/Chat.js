import React, { useState } from "react";
import {useLocation } from 'react-router-dom';

import {Messages} from '../Messages/Messages';
import {SideLeft} from '../SideLeft/sideleft';
import {SideRight} from '../SideRight/sideright';
import {useSelector} from 'react-redux';
import './Chat.css';
// let socket;
export const Chat = () => {
  const location = useLocation();
  let user = location.state.user[0];
  let socket = useSelector(state=>state.socket)
  // const [user, setUser] = useState(u);
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
      setInfoPage({...infoPage,messages:[...infoPage.messages,msg]})
  }

  socket.on('ResponseAddMember',data =>{
      if (data== false)
      {
          alert("Email không tồn tại trong ứng dụng hoặc người dùng đã có trong nhóm")
      }
      else {
        alert("Đã thêm thành viên");
        setInfoPage({...infoPage,users:[...infoPage.users,data]})
      }
  })

  socket.on('AddToGroup',data=>{
        setInfoPage({...infoPage,users:[...infoPage.users,data]})
  })

  return (
      infoPage.group===0?(
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
                    <SideRight userNow={user} users = {infoPage.users} group={infoPage.group}/>
                  </div>
          </div>
     
      )
      
  );
}