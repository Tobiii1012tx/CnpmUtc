import React, { useState, useEffect } from "react";
import {DetailUser} from "./DetailUser/detailUser"
export const SideRight = (props) =>(
        <div className="col-md-3 right">
            <div className="right-header">
                  <div className="title">
                      <h5 className="pl-2">Chi tiết thông tin nhóm</h5>
                  </div>
            </div>
            <div className="right-main">
                <div className="">
                    <div className="user-title p-0" id="headingTwo">
                        <h5 className="mb-0 pt-3 pb-3">
                            <button className="btn" data-toggle="collapse" data-target="#collapseOne">
                                    Danh sách thành viên
                            </button>
                        </h5>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body p-0">
                            {props.users.map((user, i) => 
                                <div key={i}>
                                    <DetailUser user={user}/>
                                </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
)