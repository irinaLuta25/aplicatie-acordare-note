import React, { useEffect, useState } from "react";
import "./CreateAssignment.css";
import AddPhase from "../../components/AddPhase/AddPhase";
import { useNavigate } from "react-router-dom";
import { createAssignment, createPhase, createEvaluation } from "../../API/Api";
import Cookies from "universal-cookie";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true;

function CreateAssignment() {
    const cookies = new Cookies();

    let user = cookies.get("user");
    const [subject, setSubject] = useState("");
    const [id, setId] = useState();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [assignment, setAssignment] = useState({});
    const [phases, setPhases] = useState([
        {
            name: "Inscriere",
            deadline: deadline,
            description: "",
            idAssignment: assignment.id
        },
    ]);
    const [dataFromAddPhase, setDataFromAddPhase] = useState({});

    const [components, setComponents] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [phaseValidation, setPhaseValidation] = useState([]);
    const navigate = useNavigate();

    const handler = () => {
        setComponents([...components, { id: components.length }]);
        setPhaseValidation([...phaseValidation, false]);
        setIsClicked(true);
    };

    const isFormValid = () => {
        return subject.trim() !== "" &&
            title.trim() !== "" &&
            description.trim() !== "" &&
            deadline.trim() !== "";
    };

    const handlePhaseValidationChange = (id, isValid) => {
        const updatedValidation = [...phaseValidation];
        updatedValidation[id] = isValid;
        setPhaseValidation(updatedValidation);
    };

    const areAllPhasesValid = () => {
        return phaseValidation.length > 0 && phaseValidation.every(valid => valid);
    };

    const handleDataFromAddPhase = (data) => {
        
           let newPhase= 
            {
                name: data.name,
                deadline: data.deadline,
                description: data.description,
            }
            setPhases([...phases, newPhase]);
        console.log(phases)
    }

    const handleSubmit = () => {
        if (isFormValid() && areAllPhasesValid()) {
            let newAssignment = {
                subject,
                title,
                description
            }
            createAssignment(newAssignment)
                .then((res) => {
                    if (res.status == 200) {
                        setAssignment(res.data);
                        console.log(res.data);
                    }
                })
                .catch((err) => {
                    console.error(err);
                })

            //console.log(phases);
        } else {
            alert("Please complete all fields before submitting.");
        }
    };

    useEffect(() => {
        if (assignment.id) {
            let newPhases = phases.map((phase, index) => (
                {
                    ...phase,
                    idAssignment: assignment.id,
                    deadline: index === 0 ? new Date(deadline) : phase.deadline,
                }

            ));

            console.log(newPhases);
            newPhases.forEach((phase) => {
                console.log(phase);
                createPhase(phase)
                    .then((res) => {
                        if (res.status == 200) {
                            let phaseId = res.data.id;
                            let newEvaluation = {
                                grade: 0,
                                userId: user.id,
                                phaseId: phaseId,
                                role: "Profesor"
                            }
                            createEvaluation(newEvaluation)
                                .then((res) => {
                                    if (res.status == 200) {
                                        alert("Assignment submitted successfully!");
                                    }
                                })
                                .catch((err) => {
                                    console.error(err);
                                })
                        }
                    })
            })
            navigate(`/teacherMyAssignments`)

        }
    }, [assignment])

    return (
        <div className="main-container">
            <div className="back-button-container">
                <button className="back-button" onClick={() => window.history.back()}>
                    Go Back
                </button>
            </div>
            <div className="assignment-container">
                <h1>Create Assignment</h1>
                <div className="inputs-container">
                    <span>
                        <label htmlFor="subject">Subject </label>
                        <input
                            name="subject"
                            id="subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </span>
                    <span>
                        <label htmlFor="title">Title </label>
                        <input
                            name="title"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </span>
                    <span>
                        <label htmlFor="description">Description </label>
                        <input
                            name="description"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </span>
                    <span>
                        <label htmlFor="enrollment-deadline">Enrollment Deadline </label>
                        <input
                            type="date"
                            name="enrollment-deadline"
                            id="enrollment-deadline"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />
                    </span>
                </div>

                <button className="back-button" onClick={handler}>
                    Add Phase
                </button>

                <div className="btn-container">
                    {components.map((component) => (
                        <AddPhase
                            key={component.id}
                            id={component.id}
                            onValidationChange={handlePhaseValidationChange}
                            sendDataToCreateAssignment={handleDataFromAddPhase}
                        />
                    ))}

                    {isClicked && (
                        <button
                            className="back-button"
                            onClick={handleSubmit}
                            disabled={!isFormValid() || !areAllPhasesValid()}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default CreateAssignment;
