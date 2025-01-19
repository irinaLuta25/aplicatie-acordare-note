import "./Assignment.css";
import React from "react";
import { useLocation } from "react-router-dom";
import Phases from "../Phases/Phases";

function Assignment() {
  const location = useLocation();
  const { title } = location.state || {};

  return (
    <div className="main-assignment">
      <div className="back-button-container">
        <button className="back-button" onClick={() => window.history.back()}>
          Go Back
        </button>
      </div>
      <div className="assignment-container">
        <h1>{title}</h1>
        <Phases />
      </div>
    </div>
  );
}

export default Assignment;
