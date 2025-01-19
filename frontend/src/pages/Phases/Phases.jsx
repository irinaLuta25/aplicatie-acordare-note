import React from "react";
import "./Phases.css";
import PhaseCard from "../../components/PhaseCard/PhaseCard";


function Phases() {

  return (
    <div className="course-detail">
      <h1>TILE</h1>
      <p><strong>Subject:</strong> lorem loren</p>
      <p><strong>Description:</strong> lorem loren</p>
      <p><strong>Enrollment Deadline:</strong> lorem loren</p>

      <h2>Phases</h2>
      <div className="phase-list">
        <PhaseCard/>
      </div>
    </div>
  );
}

export default Phases;
