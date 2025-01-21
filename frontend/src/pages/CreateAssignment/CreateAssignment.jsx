import React, { useState } from "react";
import "./CreateAssignment.css";
import AddPhase from "../../components/AddPhase/AddPhase";
import { useNavigate } from "react-router-dom";

function CreateAssignment() {
    const [subject, setSubject] = useState("");
    const[id,setId]=useState();
    const [assignment, setAssignment] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");

    const [components, setComponents] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [phaseValidation, setPhaseValidation] = useState([]);
    const navigate=useNavigate();

    const handler = () => {
        setComponents([...components, { id: components.length }]);
        setPhaseValidation([...phaseValidation, false]); 
        setIsClicked(true);
    };

    const isFormValid = () => {
        return subject.trim() !== "" &&
               assignment.trim() !== "" &&
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

    const handleSubmit = () => {
        if (isFormValid() && areAllPhasesValid()) {
            alert("Assignment submitted successfully!");

            navigate(`/teacherMyAssignments`,{state: {assignment,subject}})
        } else {
            alert("Please complete all fields before submitting.");
        }
    };

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
                        <label htmlFor="assignment">Assignment </label>
                        <input 
                            name="assignment" 
                            id="assignment" 
                            value={assignment}
                            onChange={(e) => setAssignment(e.target.value)}
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
                    Adauga faza
                </button>

                <div className="btn-container">
                    {components.map((component) => (
                        <AddPhase 
                            key={component.id} 
                            id={component.id} 
                            onValidationChange={handlePhaseValidationChange}
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
