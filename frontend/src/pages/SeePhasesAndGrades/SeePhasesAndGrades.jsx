import React, { useState } from "react";
import "./SeePhasesAndGrades.css";

const evaluations = [
  {
    assignment: {
      assignment_id: 1,
      subject: "Software Engineering",
      title: "Project Evaluation",
      description: "Evaluation of the final project submission.",
      phases: [
        {
          phase_id: 101,
          name: "Initial Review",
          deadline: "2024-05-15",
          description: "The first round of project evaluation.",
          evaluations: [
            {
              evaluation_id: 201,
              user: {
                user_id: 10,
                first_name: "John",
                last_name: "Doe",
                email: "john.doe@example.com",
                role: "jurat",
              },
              team: {
                team_id: 301,
                name: "Alpha Team",
              },
              grade: 8.5,
              role: "jurat",
            },
            {
              evaluation_id: 202,
              user: {
                user_id: 11,
                first_name: "Jane",
                last_name: "Smith",
                email: "jane.smith@example.com",
                role: "jurat",
              },
              team: {
                team_id: 301,
                name: "Alpha Team",
              },
              grade: 9.0,
              role: "jurat",
            },
            {
              evaluation_id: 203,
              user: {
                user_id: 12,
                first_name: "Alice",
                last_name: "Johnson",
                email: "alice.johnson@example.com",
                role: "jurat",
              },
              team: {
                team_id: 302,
                name: "Beta Team",
              },
              grade: 9.2,
              role: "jurat",
            },
          ],
        },
        {
            phase_id: 123,
            name: "Initial Review",
            deadline: "2024-05-15",
            description: "The first round of project evaluation.",
            evaluations: [
              {
                evaluation_id: 124,
                user: {
                  user_id: 104,
                  first_name: "John",
                  last_name: "Doe",
                  email: "john.doe@example.com",
                  role: "jurat",
                },
                team: {
                  team_id: 305,
                  name: "Alpha Team",
                },
                grade: 8.5,
                role: "jurat",
              },
              {
                evaluation_id: 222,
                user: {
                  user_id: 112,
                  first_name: "Jane",
                  last_name: "Smith",
                  email: "jane.smith@example.com",
                  role: "jurat",
                },
                team: {
                  team_id: 305,
                  name: "Alpha Team",
                },
                grade: 9.0,
                role: "jurat",
              },
              {
                evaluation_id: 290,
                user: {
                  user_id: 125,
                  first_name: "Alice",
                  last_name: "Johnson",
                  email: "alice.johnson@example.com",
                  role: "jurat",
                },
                team: {
                  team_id: 370,
                  name: "Beta Team",
                },
                grade: 9.2,
                role: "jurat",
              },
            ],
          },
      ],
    },
  },
];

function SeePhasesAndGrades() {
    const [activePhase, setActivePhase] = useState(null);
    const [activeEvaluation, setActiveEvaluation] = useState(null);
  
    const handlePhaseClick = (phaseId) => {
      setActivePhase(activePhase === phaseId ? null : phaseId);
    };
  
    const handleEvaluationClick = (teamId) => {
      setActiveEvaluation(activeEvaluation === teamId ? null : teamId);
    };
  
    return (
      <div className="main-see-phases">
        <div className="assigments-see-phases">
          <h1>{evaluations[0].assignment.title}</h1>
          <p><strong>Materia:</strong> {evaluations[0].assignment.subject}</p>
          <p><strong>Descriere:</strong> {evaluations[0].assignment.description}</p>
        </div>
  
        {evaluations[0].assignment.phases.map((phase) => (
          <div key={phase.phase_id} className="phase">
            <div className="phase-header" onClick={() => handlePhaseClick(phase.phase_id)}>
              <h2>{phase.name}</h2>
              <p>{phase.description}</p>
            </div>
  
            {activePhase === phase.phase_id && (
              <div className="phase-content">
                {phase.evaluations.reduce((teams, evaluation) => {
                  const teamName = evaluation.team.name;
                  if (!teams[teamName]) {
                    teams[teamName] = [];
                  }
                  teams[teamName].push(evaluation);
                  return teams;
                }, {}) && Object.entries(
                  phase.evaluations.reduce((teams, evaluation) => {
                    const teamName = evaluation.team.name;
                    if (!teams[teamName]) {
                      teams[teamName] = [];
                    }
                    teams[teamName].push(evaluation);
                    return teams;
                  }, {})
                ).map(([teamName, teamEvaluations]) => (
                  <div key={teamName} className="evaluation">
                    <div className="evaluation-header" onClick={() => handleEvaluationClick(teamEvaluations[0].team.team_id)}>
                      <strong>{teamName}</strong>
                      <span>Click pentru detalii</span>
                    </div>
                    {activeEvaluation === teamEvaluations[0].team.team_id && (
                      <div className="evaluation-details">
                        <table className="evaluation-table">
                          <thead>
                            <tr>
                              <th>Jurat</th>
                              <th>Nota</th>
                            </tr>
                          </thead>
                          <tbody>
                            {teamEvaluations.map((evaluationItem, index) => (
                              <tr key={evaluationItem.evaluation_id}>
                                <td>Jurat {index + 1}</td>
                                <td>{evaluationItem.grade}</td>
                              </tr>
                            ))}
                          </tbody>
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
