import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import EvaluationCard from "../../components/EvaluationCard/EvaluationCard";
import "./EvaluationPhases.css";

// const evaluations = [
//   {id:1, title: "Object oriented programming", name: "ECHIPA 2", phase: "Faza 1"},
//   {id:2, title: "Lorem lorem lorem lorem loremlorem lorem lorem lorem", name: "ECHIPA 2", phase: "Faza 1"},
//   {id:3, title: "Fundamentals of database systems", name: "ECHIPA 2", phase: "Faza 1"},
//   {id:4, title: "Object oriented programming", name: "ECHIPA 2", phase: "Faza 1"},
//   {id:5, title: "Fundamentals of database systems", name: "ECHIPA 2", phase: "Faza 1"},
// ];
// assignment -> faze -> evaluari -> echipa


const evaluations=[
  {
    "assignment": {
      "assignment_id": 1,
      "subject": "Software Engineering",
      "title": "Project Evaluation",
      "description": "Evaluation of the final project submission.",
      "phases": [
        {
          "phase_id": 101,
          "name": "Initial Review",
          "deadline": "2024-05-15",
          "description": "The first round of project evaluation.",
          "evaluations": [
            {
              "evaluation_id": 201,
              "user": {
                "user_id": 10,
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@example.com",
                "role": "jurat"
              },
              "team": {
                "team_id": 301,
                "name": "Alpha Team"
              },
              "grade": 8.5,
              "role": "jurat"
            },
            {
              "evaluation_id": 202,
              "user": {
                "user_id": 11,
                "first_name": "Jane",
                "last_name": "Smith",
                "email": "jane.smith@example.com",
                "role": "jurat"
              },
              "team": {
                "team_id": 302,
                "name": "Beta Team"
              },
              "grade": 9.0,
              "role": "jurat"
            }
          ]
        },
        {
          "phase_id": 102,
          "name": "Final Review",
          "deadline": "2024-06-01",
          "description": "The final round of project evaluation.",
          "evaluations": [
            {
              "evaluation_id": 203,
              "user": {
                "user_id": 12,
                "first_name": "Alice",
                "last_name": "Johnson",
                "email": "alice.johnson@example.com",
                "role": "jurat"
              },
              "team": {
                "team_id": 303,
                "name": "Gamma Team"
              },
              "grade": 9.2,
              "role": "jurat"
            }
          ]
        }
      ]
    }
  }
]

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
              <EvaluationCard key={evaluation.assignment.assignment_id} evaluation={evaluation.assignment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationPhases;
