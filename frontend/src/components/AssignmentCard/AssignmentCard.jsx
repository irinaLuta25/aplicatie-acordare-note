import React from "react";
import "./AssignmentCard.css";
import image from '../../assets/opening_book.png'

function AssignmentCard({title}) {
  return (
    <div className="assignment-card">
      <img src={image} className="assignment-icon"/>
      <h3>{title}</h3>
      <button>View</button>
    </div>
  );
}

export default AssignmentCard;
