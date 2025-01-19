import React from "react";
import "./PhaseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";

function PhaseCard() {
  return (
    <div className="phase-card">
      <h3>NAME PHASE</h3>
      <p><strong>Deadline:</strong> 01.01.2000</p>
      <p>Fa un proiect in care sa...</p>
      
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
