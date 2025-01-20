import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import EvaluationCard from "../../components/EvaluationCard/EvaluationCard";
import "./EvaluationPhases.css";

const evaluations = [
  {id:1, title: "Object oriented programming", name: "ECHIPA 2", phase: "Faza 1"},
  {id:2, title: "Lorem lorem lorem lorem loremlorem lorem lorem lorem", name: "ECHIPA 2", phase: "Faza 1"},
  {id:3, title: "Fundamentals of database systems", name: "ECHIPA 2", phase: "Faza 1"},
  {id:4, title: "Object oriented programming", name: "ECHIPA 2", phase: "Faza 1"},
  {id:5, title: "Fundamentals of database systems", name: "ECHIPA 2", phase: "Faza 1"},
];

function EvaluationPhases() {
  return (
    <div className="courses">
      <div className="section2">
        <Sidebar />
      </div>
      <div className="main-evaluation">
        <HeaderProfile />
        <div className="evaluations">
          <h2>Evaluations</h2>
          <div className="evaluation-grid">
            {evaluations.map((evaluation) => (
              <EvaluationCard key={evaluation.id} title={evaluation.title} phase={evaluation.phase} name={evaluation.name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationPhases;
