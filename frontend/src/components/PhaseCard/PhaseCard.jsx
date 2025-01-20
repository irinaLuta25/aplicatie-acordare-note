import React from "react";
import "./PhaseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function PhaseCard({phase}) {
  const formattedDeadline = phase.deadline instanceof Date 
  ? phase.deadline.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  : "Invalid Date";
  return (
    <div className="phase-card">
      <h3>{phase.name}</h3>
      <p><strong>Deadline:</strong> {formattedDeadline}</p>
      <p>{phase.description}</p>
      
      <div className="upload-section">
        <div className="upload-box">
        <FontAwesomeIcon icon={faUpload} className="upload-icon" />
          <p>Drag your file(s) to start uploading</p>
          <span>OR</span>
          <button className="browse-btn">Browse files</button>
        </div>
        <p className="file-support-text">Only support .mp4 and zip files</p>
      </div>
    </div>
  );
}

export default PhaseCard;
