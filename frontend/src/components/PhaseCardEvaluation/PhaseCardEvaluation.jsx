import React, { useState } from "react";
import "./PhaseCardEvaluation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { updateEvaluation } from "../../API/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PhaseCardEvaluation({ phase }) {
  const [gradeState, setGradeState] = useState({});
  let [evaluationToUpdate, setEvaluationToUpdate] = useState({})


  const handleGradeChange = (evaluationId, value, evaluation) => {
    setGradeState((prevState) => ({
      ...prevState,
      [evaluationId]: value,
    }));
    setEvaluationToUpdate({
      grade: value,
      userId: evaluation.userId,
      teamId: evaluation.teamId,
      phaseId: evaluation.phaseId,
      role: evaluation.role
    })
  };


  const handlerClick = (id) => {
    updateEvaluation(id, evaluationToUpdate)
      .then(() => {
        toast.success('🦄 Grade saved! 🐊', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

      })
      .catch(err => console.error(err))
  }

  return (
    <div className="phase-card-evaluation">
      <div>
        <h3>{phase.name}</h3>
        <p>{phase.description}</p>
        {phase.evaluations.map((evaluation) => (
          <div className="phase-content" key={`evaluation-${evaluation.id}`}>
            <p>Team: {evaluation.team.name}</p>
            <button className="phase-btn">Download</button>
            <label htmlFor={`grade-${evaluation.id}`}>Grade: </label>
            <input
              name={`grade-${evaluation.id}`}
              id={`grade-${evaluation.id}`}
              value={gradeState[evaluation.id] || ""}
              onChange={(e) => handleGradeChange(evaluation.id, e.target.value, evaluation)}
            />
            <p>Your evaluation: {gradeState[evaluation.id] || evaluation.grade}</p>
            <button onClick={() => handlerClick(evaluation.id)} className="phase-btn phase-btn-save">Save</button>
          </div>
        ))}
      </div>
        <ToastContainer />
    </div>
  );
}

export default PhaseCardEvaluation;
