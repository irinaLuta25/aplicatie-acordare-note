import "./AssignmentPhases.css";
import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import PhaseCard from "../../components/PhaseCard/PhaseCard";
import EnrollmentPhaseCard from "../../components/EnrollmentPhaseCard/EnrollmentPhaseCard";
import { createEvaluationStudent, getTeamStatus, getAllTeamsByPhaseIdByUser, createEvaluationJury, getJuryStatusByPhaseId } from "../../API/Api";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true;

function AssignmentPhases() {
  const location = useLocation();
  const { assignment } = location.state || {};
  const [hasFile, setHasFile] = useState(false);
  const [createdTeams, setCreatedTeams] = useState({});
  const [juryCreated, setJuryCreated] = useState(false);
  const [userTeam, setUserTeam] = useState(null);
  const [filesToUpload, setFilesToUpload] = useState([]);

  const isTeamsChecked = useRef(false);
  const isJuryChecked = useRef(false);

  const cookies = new Cookies();
  const userId = cookies.get("user")?.id;

  useEffect(() => {
    if (!assignment || !assignment.phases || assignment.phases.length < 2) return;

    if (isTeamsChecked.current) return;
    isTeamsChecked.current = true;

    const checkAndCreateTeams = async () => {
      for (let i = 1; i < assignment.phases.length; i++) {
        let previousDeadline = new Date(assignment.phases[i - 1].deadline);
        let currentDate = new Date();

        if (previousDeadline < currentDate && !createdTeams[assignment.phases[i].id]) {
          try {
            const res = await getTeamStatus(assignment.phases[i].id);

            if (res.status === 200 && res.data.teamsCreated === false) {
              await createEvaluationStudent(assignment.phases[i - 1].id, assignment.phases[i].id);

              setCreatedTeams((prevState) => ({
                ...prevState,
                [assignment.phases[i].id]: true,
              }));
            }
          } catch (err) {
            console.error(`Eroare la verificarea echipelor pentru faza ${assignment.phases[i].id}:`, err);
          }
        }
      }
    };

    checkAndCreateTeams();
  }, [assignment]);

  useEffect(() => {
    const fetchUserTeam = async () => {
      try {
        for (let phase of assignment.phases) {
          const response = await getAllTeamsByPhaseIdByUser(phase.id);
          if (response.status === 200) {
            const teams = response.data;

            const foundTeam = teams.find(team =>
              team.evaluations.some(evaluation => evaluation.userId === userId)
            );

            if (foundTeam) {
              setUserTeam(foundTeam);
              break;
            }
          }
        }
      } catch (err) {
        console.error("Eroare la preluarea echipei utilizatorului:", err);
      }
    };

    if (assignment?.phases && userId) {
      fetchUserTeam();
    }
  }, [assignment, userId]);

  useEffect(() => {
    if (assignment?.phases.length > 0 && !juryCreated && !isJuryChecked.current) {
      isJuryChecked.current = true;

      let targetId = 0
      for(let phase of assignment.phases) {
        if(new Date(phase.deadline).getDate()==new Date().getDate()&&new Date(phase.deadline).getFullYear()==new Date().getFullYear()&&new Date(phase.deadline).getMonth()==new Date().getMonth()){
          targetId = phase.id
        }
      }      

      const checkAndCreateJury = async () => {
        try {
          const res = await getJuryStatusByPhaseId(targetId);

          if (res.status === 200 && res.data.juryCreated === false) {
            console.log("Generare juriu în progres...");
            await createEvaluationJury(targetId);

            setJuryCreated(true);
            console.log("Juriul a fost creat cu succes!");
            } else {
              console.log("Juriul a fost deja creat.");
              setJuryCreated(true);
            }
          
        } catch (err) {
          console.error("Eroare la generarea juriului:", err);
        
      }};

      checkAndCreateJury();
    
  }
  }, [assignment, juryCreated]);


  const handleUpload = async () => {
    if (filesToUpload.length === 0) {
      alert("No files selected for upload.");
      return;
    }

    const formData = new FormData();
    filesToUpload.forEach((file) => formData.append("file", file));

    try {
      const response = await axios.post("/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Files uploaded successfully!");
      console.log(response.data);
      setFilesToUpload([]);
    } catch (error) {
      console.error("Error uploading files:", error);
      alert("Error uploading files. Please try again.");
    }
  };

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
        <p><strong>Subject:</strong> {assignment.subject}</p>
        <p><strong>Description:</strong> {assignment.description}</p>

        {userTeam ? (
          <div className="user-team-section">
            <h2>My Team</h2>
            <p><strong>Team name:</strong> {userTeam.name}</p>
            <h3>Team Members:</h3>
            <ul>
              {userTeam.evaluations
                .filter((evaluation) => evaluation.role === "student")
                .map((evaluation, index) => (
                  <li key={index}>
                    {evaluation.user.firstName} {evaluation.user.lastName}
                  </li>
                ))}
            </ul>
            <h3>Team grades:</h3>
            <table className="grades-table">
              <thead>
                <tr>
                  <th>Phase</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {userTeam.evaluations
                  .filter((evaluation) => evaluation.userId === userId && evaluation.role === "student")
                  .map((evaluation, index) => (
                    <tr key={index}>
                      <td>{evaluation.phaseId}</td>
                      <td>{evaluation.grade !== null ? evaluation.grade : "N/A"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>You're not assigned to a team.</p>
        )}

        <h2>Phases</h2>
        <div className="phase-list">
          {(() => {
            let currentDate = new Date();
            let firstPhaseDeadline = new Date(assignment.phases[0].deadline);

            if (firstPhaseDeadline < currentDate) {
              let eligibleAssignments = assignment.phases.slice(1);
              return eligibleAssignments.reduce((visiblePhases, currentPhase, index, phases) => {
                const currentDate = new Date();

                const isEligible =
                  index === 0 ||
                  new Date(phases[index - 1].deadline) <= currentDate;

                if (isEligible) {
                  visiblePhases.push(
                    <PhaseCard
                      key={currentPhase.phase_id}
                      phase={currentPhase}
                      onFileSelect={(files) => {
                        setFilesToUpload((prev) => [...prev, ...files]);
                        setHasFile(true); }}
                    />
                  );
                }

                return visiblePhases; 
              }, []);
              /*return eligibleAssignments.reduce((visiblePhases, currentPhase, index, phases) => {
                  const currentDate = new Date();

                  const isEligible =
                    index === 0 ||
                    new Date(phases[index - 1].deadline) <= currentDate;


                  if (isEligible) {
                    visiblePhases.push(
                      <PhaseCard
                        key={currentPhase.phase_id}
                        phase={currentPhase}
                        onFileSelect={(files) => {
                          setFilesToUpload((prev) => [...prev, ...files]);
                          setHasFile(true); 
                      />
                    );
                  }

                  return visiblePhases; 
                }, []);
x*/ 
            } else {
              return <EnrollmentPhaseCard key={assignment.id} assignment={assignment} />;
            }
          })()}
          {hasFile && <button className="submit-btn" onClick={handleUpload}>Submit</button>}
        </div>
      </div>
    </div>
  </div>
);
}

export default AssignmentPhases;
