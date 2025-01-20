import React from "react";
import AssignmentCard from "../AssignmentCard/AssignmentCard";
import "./Assignments.css";

function Assignments() {
  const assignments = [
    {
        assignment_id: 1,
        subject: "Programming",
        title: "Object oriented programming",
        description: "Proiect POO",
        phases: [
            { phase_id: 1, name: "INSCRIERE!!!", deadline: new Date("2025-01-18"), description: "Design phase details" },
            { phase_id: 2, name: "Implementation", deadline: new Date("2025-01-16"), description: "Implementation phase details" },
            { phase_id: 3, name: "Implementation CEVA CEVA", deadline: new Date("2025-01-21"), description: "Implementation phase details" }
        ]
    },
    {
        assignment_id: 2,
        subject: "Misc",
        title: "Lorem lorem lorem lorem loremlorem lorem lorem lorem",
        description: "Proiect ceva",
        phases: [
            { phase_id: 3, name: "Planning", deadline: new Date("2025-02-15"), description: "Planning phase details" },
            { phase_id: 4, name: "Execution", deadline: new Date("2025-05-01"), description: "Execution phase details" }
        ]
    },
    {
        assignment_id: 3,
        subject: "Database",
        title: "Fundamentals of database systems",
        description: "Proiect Micro",
        phases: [
            { phase_id: 5, name: "Requirements Analysis", deadline: new Date("2025-01-20"), description: "Analysis phase" },
            { phase_id: 6, name: "Development", deadline: new Date("2025-04-20"), description: "Development phase" }
        ]
    },
    {
        assignment_id: 4,
        subject: "Programming",
        title: "Object oriented programming",
        description: "Proiect Java",
        phases: [
            { phase_id: 7, name: "Research", deadline: new Date("2025-03-10"), description: "Research phase details" },
            { phase_id: 8, name: "Coding", deadline: new Date("2025-06-01"), description: "Coding phase details" }
        ]
    },
    {
        assignment_id: 5,
        subject: "Database",
        title: "Fundamentals of database systems",
        description: "Proiect TW",
        phases: [
            { phase_id: 9, name: "Data Modeling", deadline: new Date("2025-03-15"), description: "Data modeling phase" },
            { phase_id: 10, name: "Testing", deadline: new Date("2025-07-01"), description: "Testing phase details" }
        ]
    }
];


  return (
    <div className="assignments">
      <h2>Assignments</h2>
      <div className="assignment-grid">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.assignment_id} assignment={assignment} />        
          ))} 
      </div>
    </div>
  );
}

export default Assignments;
