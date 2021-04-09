import React, { useState, useEffect } from "react";
import {SingleGroup} from "./SingleGroup/singlegroup"
import { useSelector } from 'react-redux';
export const SideLeft = (props) => {
    const [groups, SetGroup] = useState([]);
    let socket = useSelector(state=>state.socket)
    const ENDPOINT = useSelector(state => state.ENDPOINT)
    let Id = props.user;
    useEffect(()=>{
        const LoadGroup = ()=>{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({Id})
            };
            fetch('http://'+ENDPOINT+'/Group/Index', requestOptions)
                .then(response => response.json())
                .then(data => {
                    // SetGroup(data)
                    SetGroup(data)

                    data.forEach(function(item){
                        socket.emit('join',item.Id, Id,(error) => {
                            if(error) {
                                console.log(error);
                            }
                        })
                    })
                    
                });
          }
        LoadGroup();
    }, [])

    function ChooseGroup(value){
        props.choosegroup(value);
    }

    function AddGroup(el){
        if(el.key==='Enter')
        {
            let value = el.target.value;
            if(value != ''){
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ Id:0,Name : value , OwnerId : Id})
                };
                fetch('http://'+ENDPOINT+'/Group/AddGroup', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        SetGroup(msgs => [ ...msgs, data ]);
                    });
            }
            else{
                alert('Bạn cần nhập đầy đủ thông tin !!')
            }
        }
    }

    socket.on('AddToGroup',data=>{
        console.log(data)
        SetGroup([...groups,data])
    })

    socket.on('LeaveSuccess',data=>{
        let newGroup = groups.filter(x=>x.Id === data.Id);
        console.log(newGroup)
        SetGroup(newGroup)
    })
   
    return(
        <div className="col-lg-3 col-md-5 left">
        <div className="left-header pl-2 pr-2">
                <div className="left-header-title d-flex justify-content-between align-items-center pt-2 pb-2">
                    <div className="title-group">
                        <h5 className="m-0">Danh sách nhóm của tôi</h5>
                    </div>
                    <div className="add-group">
                        <button className="btn btn-outline-primary" data-toggle="collapse" data-target="#FormSearch">
                            Thêm mới
                        </button>
                    </div>
                </div>

                <div className="collapse" id="FormSearch">
                    <div className="search-input mb-3">
                        <div className="inp-search">
                            <input type="text" name="Search" className="form-control" placeholder="Đặt tên nhóm và ấn Enter..." onKeyPress={e=>{AddGroup(e)}}/>
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="left-main">
                <div className="list-group">
                    {groups.map((group, i) => 
                    <div key={i}>
                        <SingleGroup userId = {Id} group={group} choosegroup={(value)=>ChooseGroup(value)}/>
                    </div>)}
                </div>
            </div>
        </div>
    )
};