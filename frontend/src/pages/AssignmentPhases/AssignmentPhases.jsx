import "./AssignmentPhases.css";
import React from "react";
import { useLocation } from "react-router-dom";
import PhaseCard from "../../components/PhaseCard/PhaseCard";
import EnrollmentPhaseCard from "../../components/EnrollmentPhaseCard/EnrollmentPhaseCard";
import { useState } from "react";

function AssignmentPhases() {
  const location = useLocation();
  const { assignment } = location.state || {};
  const [hasFile, setHasFile]=useState(false);

  const handleSubmit=()=>{

  }

  return (
    <div className="main-assignment">
      <div className="back-button-container">
        <button className="back-button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
      <div className="assignment-container">
        <div className="course-detail">
          <h1>{assignment.title}</h1>
          <p>
            <strong>Subject:</strong>
            {assignment.subject}
          </p>
          <p>
            <strong>Description:</strong>
            {assignment.description}
          </p>

          <h2>Phases</h2>
          <div className="phase-list">
         
            {(() => {
              let currentDate = new Date();
              let firstPhaseDeadline = new Date(assignment.phases[0].deadline);
            
              if (firstPhaseDeadline < currentDate) {
                let eligibleAssignments=assignment.phases.slice(1);
                return eligibleAssignments.filter(phase=>new Date(phase.deadline)<currentDate).map((phase)=>
                  <PhaseCard key={phase.phase_id} phase={phase} onFileSelect={(files)=>setHasFile(true)}/>
              )
            
              } else {
                return <EnrollmentPhaseCard
                key={assignment.assignment_id}
                assignment={assignment}
              />
              }
            })()}
             {hasFile && (
                <button className="submit-btn">Submit</button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentPhases;