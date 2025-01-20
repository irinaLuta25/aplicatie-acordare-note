import React from "react";
import "./CreateAssignment.css"

function CreateAssignment() {
    return (
        <div className="main-container">
            <div className="back-button-container">
                <button className="back-button" onClick={() => window.history.back()}>
                    Go Back
                </button>
            </div>
            <div className="assignment-container">
                <h1>Create Assignment</h1>
                <label for="subject">Subject</label>
                <input name="subject" id="subject" />
                <label for="assignment">Assignment</label>
                <input name="assignment" id="assignment" />
                <label for="enrollment-deadline">Enrollment Deadline</label>
                <input name="enrollment-deadline" id="enrollment-deadline" />
                <button className="back-button">Adauga faza</button>
            </div>
        </div>
    );
}

export default CreateAssignment;