import React from "react";
import "./AssignmentCard.css";
import image from '../../assets/opening_book.png'
import {useNavigate} from "react-router-dom"

function AssignmentCard({title,id}) {
  const navigate=useNavigate();

  const handlerClick=()=>{
    navigate(`/assignment/${id}`,{state:{title}})
  }
  return (
    <div className="assignment-card">
      <img src={image} className="assignment-icon"/>
      <h3>{title}</h3>
      <button onClick={handlerClick}>View</button>
    </div>
  );
}

export default AssignmentCard;
