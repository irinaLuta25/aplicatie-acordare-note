import React from "react";
import "./AssignmentCard.css";
import image from '../../assets/opening_book.png'
import {useNavigate} from "react-router-dom"


function AssignmentCard({assignment}) {
  const navigate=useNavigate();

  const handlerClick=()=>{
    navigate(`/assignment/${assignment.assignment_id}`,{state:{assignment}})
  }
  return (
    <div className="assignment-card">
      <img src={image} className="assignment-icon"/>
      <h3>{assignment.title}</h3>
      <button onClick={handlerClick}>View</button>
    </div>
  );
}

export default AssignmentCard;
