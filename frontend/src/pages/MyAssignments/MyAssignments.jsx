import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import AssignmentCard from "../../components/AssignmentCard/AssignmentCard";
import { useLocation } from "react-router-dom";
import "./MyAssignments.css";

function MyAssignments() {
  const location = useLocation();
  const [currentAssignment, setCurrentAssignment] = useState(null);

  useEffect(() => {
    if (location.state?.assignment) {
      setCurrentAssignment(location.state.assignment);
    }
  }, []);

  return (
    <div className="courses">
      <div className="section2">
        <Sidebar />
      </div>
      <div className="main">
        <HeaderProfile />
        {currentAssignment ? (
          <AssignmentCard
            key={currentAssignment.assignment_id}
            assignment={currentAssignment}
          />
        ) : (
          <p>Nu există assignment înscris.</p>
        )}
      </div>
    </div>
  );
}

export default MyAssignments;
