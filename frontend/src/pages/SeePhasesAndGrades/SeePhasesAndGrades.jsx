import React, { useState } from "react";
import "./SeePhasesAndGrades.css";
import { useLocation } from "react-router-dom";

function SeePhasesAndGrades() {
  const location = useLocation();
  const { assignment } = location.state;


  const [activePhase, setActivePhase] = useState(null);
  const [activeEvaluation, setActiveEvaluation] = useState(null);

  const handlePhaseClick = (phaseId) => {
    setActivePhase(activePhase === phaseId ? null : phaseId);
  };

  const handleEvaluationClick = (teamId) => {
    setActiveEvaluation(activeEvaluation === teamId ? null : teamId);
  };

  const calculateAverage = (grades) => {
    if (grades.length === 0) return 0;
    if (grades.length === 2) {
      return ((grades[0] + grades[1]) / 2).toFixed(2);
    } else if (grades.length > 2) {
      const sortedGrades = [...grades].sort((a, b) => a - b); 
      const filteredGrades = sortedGrades.slice(1, -1); 
      const total = filteredGrades.reduce((sum, grade) => sum + grade, 0);
      return (total / filteredGrades.length).toFixed(2);
    } else {
      return grades[0].toFixed(2);
    }
  };

  return (
    <div className="main-see-phases">
       <div className="back-button-container">
                <button className="back-button" onClick={() => window.history.back()}>
                    Go Back
                </button>
            </div>
      <div className="assignments-see-phases">
        <h1>{assignment.title}</h1>
        <p><strong>Materia:</strong> {assignment.subject}</p>
        <p><strong>Descriere:</strong> {assignment.description}</p>
      </div>

      {assignment.phases.map((phase) => (
        <div key={phase.id} className="phase">
          <div className="phase-header" onClick={() => handlePhaseClick(phase.id)}>
            <h2>{phase.name}</h2>
            <p>{phase.description}</p>
          </div>

          {activePhase === phase.id && (
            <div className="phase-content">
              {phase.grades.map((team) => (
                <div key={team.id} className="evaluation">
                  <div className="evaluation-header" onClick={() => handleEvaluationClick(team.id)}>
                    <strong>{team.name}</strong>
                    <span> Click pentru detalii</span>
                  </div>

                  {activeEvaluation === team.id && (
                    <div className="evaluation-details">
                      <table className="evaluation-table">
                        <thead>
                          <tr>
                            <th>Jurat</th>
                            <th>Nota</th>
                          </tr>
                        </thead>
                        <tbody>
                          {team.totalGrades.map((grade, index) => (
                            <tr key={`${team.id}-${index}`}>
                              <td>Jurat {index + 1}</td>
                              <td>{grade}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td><strong>Media Notelor</strong></td>
                            <td><strong>{calculateAverage(team.totalGrades)}</strong></td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default SeePhasesAndGrades;
