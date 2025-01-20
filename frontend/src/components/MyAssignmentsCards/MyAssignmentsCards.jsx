import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import AssignmentCard from "../../components/AssignmentCard/AssignmentCard";
import "./MyAssignmentsCards.css";

function MyAssignments({ assignment }) {
  return (
    <div className="courses">
      <div className="section2">
        <Sidebar />
      </div>
      <div className="main">
        <HeaderProfile />
        {assignment ? (
          <AssignmentCard key={assignment.assignment_id} assignment={assignment} />
        ) : (
          <p>No assignments enrolled yet.</p>
        )}
      </div>
    </div>
  );
}

export default MyAssignments;
