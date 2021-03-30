import React, { useState, useEffect } from "react";
import {SingleGroup} from "./SingleGroup/singlegroup"

export const SideLeft = (props) => {
    const [groups, SetGroup] = useState([]);
    let Id = props.user;
    useEffect(()=>{
        LoadGroup();
        function LoadGroup(){
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({Id})
            };
            fetch('http://localhost:5000/Group/Index', requestOptions)
                .then(response => response.json())
                .then(data => {
                    // SetGroup(data)
                    SetGroup(data)
                });
          }
    }, [])

    function ChooseGroup(value){
        props.choosegroup(value);
    }

    return(
        <div className="col-md-3 left">
        <div className="left-header pl-2 pr-2">
                <div className="d-flex">
                    <div className="title-group">
                        <h5 className="pt-3">Danh sách nhóm của tôi</h5>
                    </div>
                    {/* <div className="add-group">
                        <button>
                            <i className="fas fa-search"></i>
                        </button>
                    </div> */}
                </div>

                <div className="search-input mb-3">
                    <div className="inp-search">
                        <input type="text" name="Search" className="form-control" placeholder="Tìm kiếm trên Messenger"/>
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