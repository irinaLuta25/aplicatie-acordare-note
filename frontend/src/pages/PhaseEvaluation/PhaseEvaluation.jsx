import React from "react"
import "./PhaseEvaluation.css"
import { useLocation } from "react-router-dom";
import PhaseCardEvaluation from "../../components/PhaseCardEvaluation/PhaseCardEvaluation";

function PhaseEvaluation() {
 
  const location = useLocation();
  const { evaluation } = location.state || {};
 
  return (
    <div className="main-assignment">
      <div className="back-button-container">
        <button className="back-button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
      <div className="assignment-container">
        <div className="course-detail">
          <h1>{evaluation.title}</h1>
          <p>
            <strong>Subject: </strong>
            {evaluation.subject}
          </p>
          <p>
            <strong>Description: </strong>
            {evaluation.description}
          </p>
          
          <h2>Phases</h2>
          <div className="phase-list">
            {evaluation.phases.map((phase) => (
              <PhaseCardEvaluation key={phase.phase_id} phase={phase} />)
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default PhaseEvaluation;