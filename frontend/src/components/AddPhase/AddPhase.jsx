import React, { useState, useEffect } from "react";
import "./AddPhase.css";

function AddPhase({ id, onValidationChange, sendDataToCreateAssignment }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isValid,setIsValid]=useState(false);

    const isFormValidForPhases = () => {
        return name.trim() !== "" &&
               deadline.trim() !== "" &&
               description.trim() !== ""
    };

    useEffect(() => {
        const valid = isFormValidForPhases();
        setIsValid(valid);
        onValidationChange(id, valid);

        if (valid) {
            const debounceTimer = setTimeout(() => {
                const newPhase = {
                    name,
                    deadline,
                    description,
                };
                sendDataToCreateAssignment(newPhase);
            }, 300);

            return () => clearTimeout(debounceTimer);
        }
    }, [name, deadline, description]); 


    return (
        <div className="add-phase-container">
            <h3>Phase {id + 1}</h3>
            <div className="phase-inputs-container">
                <span>
                    <label htmlFor={`name-${id}`}>Name: </label>
                    <input
                        name={`name-${id}`}
                        id={`name-${id}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </span>
                <span>
                    <label htmlFor={`deadline-${id}`}>Deadline: </label>
                    <input
                        name={`deadline-${id}`}
                        type="date"
                        id={`deadline-${id}`}
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                </span>
                <span>
                    <label htmlFor={`description-${id}`}>Description: </label>
                    <input
                        name={`description-${id}`}
                        id={`description-${id}`}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </span>
            </div>
        </div>
    );
}

export default AddPhase;
