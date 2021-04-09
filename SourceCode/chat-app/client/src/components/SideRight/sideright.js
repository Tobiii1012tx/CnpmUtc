import React from "react";
import {DetailUser} from "./DetailUser/detailUser"
import $ from 'jquery';
import { useSelector } from 'react-redux';

export const SideRight = (props) =>{
        const socket = useSelector(state=>state.socket)
        const ENDPOINT = useSelector(state=>state.ENDPOINT)
        function AddUser (){
            let email = $('input[name=Email]').val();
            if (email !=='') {
                    let user = { Email : email,GroupId : props.group}
                    socket.emit('AddMember',user)
                }
                else{
                    alert('Bạn cần nhập đầy đủ thông tin !!')
                }
        }


        function LeaveGroup(){
            let user = { GroupId : props.group, UserId : props.userNow.Id}
            socket.emit('Leave',user)
        }
        return (
        <div className="col-lg-3 right">
            <div className="right-header">
                  <div className="title">
                      <h5 className="pl-2">Chi tiết thông tin nhóm</h5>
                  </div>
            </div>
            <div className="right-main">

                <div className="action d-flex justify-content-between p-3">
                    <input className="form-control" name="Email" placeholder="Nhập email bạn của bạn..." />
                    <div className="add-user"><button className="btn btn-outline-primary ml-2" onClick={()=>{AddUser()}}>Thêm</button></div>
                </div>

                <div className="list-member">
                    <div className="user-title p-0" id="headingTwo">
                        <h5 className="mb-0 pt-2 pb-2">
                            <button className="btn" data-toggle="collapse" data-target="#collapseOne">
                                    Danh sách thành viên
                            </button>
                        </h5>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body p-0">
                            {props.users.map((user, i) => 
                                <div key={i}>
                                    <DetailUser userNow={props.userNow} user={user}/>
                                </div>)}
                        </div>
                    </div>
                </div>

                <div className="out-user">
                    <button className="btn btn-outline-danger w-100" onClick={() =>{LeaveGroup()}}>Rời nhóm</button>
                </div>
            </div>
        </div>)
}