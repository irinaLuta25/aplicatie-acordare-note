import React from "react";
import "./EvaluationCard.css";
import image from '../../assets/evaluationImg.png'
import {useNavigate} from "react-router-dom"

function EvaluationCard({evaluation}) {
  const navigate=useNavigate();
  const handlerEvaluation=()=>{
    navigate(`/evaluation/${evaluation.assignment_id}`,{state:{evaluation}})
  }
  return (
    <div className="evaluation-card">
      <img src={image} className="evaluation-icon"/>
      <div  className="evaluation-details">
        <h3>{evaluation.title}</h3>
        <p>{evaluation.subject}</p>
        <button onClick={handlerEvaluation}>View</button>
      </div>
    </div>
  );
}

export default EvaluationCard;
