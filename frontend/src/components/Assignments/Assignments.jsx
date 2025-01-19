import React from "react";
import AssignmentCard from "../AssignmentCard/AssignmentCard";
import "./Assignments.css";

function Assignments() {
  const assignments = [
    { title: "Object oriented programming"},
    { title: "Lorem lorem lorem lorem loremlorem lorem lorem lorem"},
    { title: "Fundamentals of database systems"},
    { title: "Object oriented programming"},
    { title: "Fundamentals of database systems"},
  ];

  return (
    <div className="assignments">
      <h2>Assignments</h2>
      <div className="assignment-grid">
        {assignments.map((assignment, index) => (
          <AssignmentCard key={index} title={assignment.title}/>
        ))}
      </div>
    </div>
  );
}

export default Assignments;
