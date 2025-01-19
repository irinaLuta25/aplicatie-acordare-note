import React from "react";
import AssignmentCard from "../AssignmentCard/AssignmentCard";
import "./MyAssignmentsCards.css";

function MyAssignmentsCards() {
  const assignments = [
    {id:1, title: "Object oriented programming"},
    {id:2, title: "Lorem lorem lorem lorem loremlorem lorem lorem lorem"},
    {id:3, title: "Fundamentals of database systems"},
    {id:4, title: "Object oriented programming"},
    {id:5, title: "Fundamentals of database systems"},
  ];

  return (
    <div className="assignments">
      <h2>My Assignments</h2>
      <div className="assignment-grid">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} title={assignment.title}/>
        ))}
      </div>
    </div>
  );
}

export default MyAssignmentsCards;
