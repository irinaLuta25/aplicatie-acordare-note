import React from "react";
import "./PhaseCardEvaluation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function PhaseCardEvaluation({ phase }) {
  return (
    <div className="phase-card">
      <div>
        <h3>{phase.name}</h3>
        <p>{phase.description}</p>
        {phase.evaluations.map((evaluation) => (
          <div className="phase-content" key={evaluation.evaluation_id}>
            <p>Team: {evaluation.team.name}</p>
            <button className="phase-btn">Download</button>
            <label htmlFor="grade">Grade: </label>
            <input name="grade" id="grade" value={evaluation.grade} readOnly />
            <p>Your evaluation: {evaluation.grade}</p>
            <button className="phase-btn phase-btn-save">Save</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhaseCardEvaluation;
