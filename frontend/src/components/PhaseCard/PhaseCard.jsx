import React, { useState, useRef, useEffect } from "react";
import "./PhaseCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import { calculateGrades } from "../../API/Api";
import Cookies from "universal-cookie";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true;

function PhaseCard({ phase, onFileSelect }) {
  const cookies = new Cookies();

  let user = cookies.get("user");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [isInDeadline, setIsInDeadline] = useState(true)
  const [grade, setGrade] = useState();

  useEffect(() => {
    if (new Date(phase.deadline) < new Date()) {
      setIsInDeadline(false);
    }
  })

  useEffect(() => {
    calculateGrades(phase.id,user.id)
      .then(gr=>setGrade(gr))
      .catch((err) => console.error(err))
  })

  const handleFiles = (files) => {
    const newFiles = Array.from(files);
    setSelectedFiles(prev => {
      const updatedFiles = [...prev, ...newFiles];
      onFileSelect(updatedFiles);
      return updatedFiles;
    });
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const { files } = e.dataTransfer;
    handleFiles(files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files);
  };

  return (
    <div className="phase-card">
      <h3>{phase.name}</h3>
      <p><strong>Deadline:</strong> {new Date(phase.deadline).toLocaleDateString("ro-RO")}</p>
      <p>{phase.description}</p>
      {isInDeadline ? (
        <div className="upload-section">
          <div
            className={`upload-box ${isDragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileInputChange}
              style={{ display: 'none' }}
              multiple
            />
            <FontAwesomeIcon icon={faUpload} className="upload-icon" />
            <p>Drag your file(s) to start uploading</p>
            <span>OR</span>
            <button
              className="browse-btn"
              onClick={handleBrowseClick}
            >
              Browse files
            </button>
          </div>
          <p className="file-support-text">Only support .mp4 and zip files</p>

          {selectedFiles.length > 0 && (
            <div className="selected-files">
              <h4>Selected Files:</h4>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

      ) : (
        <p>Received grade: {grade}</p>
      )}

    </div>
  );
}

export default PhaseCard;