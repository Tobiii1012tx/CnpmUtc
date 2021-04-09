import React from 'react';
import $ from 'jquery'; 
export const SingleGroup = (props) => {
    function ChooseGroup(el){
        if(!$(el).hasClass('active')){
            $('.group-item').removeClass('active');
            $(el).addClass('active')
        }
        props.choosegroup(props.group.Id)
    }
    return(
        <div className="group-item p-2" onClick={(e)=>{ChooseGroup(e.currentTarget)}}>
            <div className="name-group">
                <h6 className="p-1 m-0"><b>{props.group.Name}</b></h6>
            </div>
        </div>
    )
};