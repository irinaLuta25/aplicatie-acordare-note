import React from "react";
import "./EvaluationCard.css";
import image from '../../assets/evaluationImg.png'
import {useNavigate} from "react-router-dom"

function EvaluationCard({id,title,name,phase}) {

  return (
    <div className="evaluation-card">
      <img src={image} className="evaluation-icon"/>
      <div  className="evaluation-details">
        <h3>{title}</h3>
        <p>{phase}</p>
        <p>{name}</p>
        <button>View</button>
      </div>
    </div>
  );
}

export default EvaluationCard;
