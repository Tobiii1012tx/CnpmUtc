import React from 'react';


export const SingleGroup = (props) => {
    return(
    <div className="group-item p-1" onClick={()=>props.choosegroup(props.group.Id)}>
        <div className="name-group d-flex">
            <p className="p-2 m-0">{props.group.Name}</p>
        </div>
    </div>
    )
};