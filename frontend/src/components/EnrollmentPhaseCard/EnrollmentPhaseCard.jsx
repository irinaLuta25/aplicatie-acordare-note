import React from "react"
import "./EnrollmentPhaseCard.css"
import { useNavigate } from "react-router-dom"

function EnrollmentPhaseCard({assignment}) {
    
    let navigate=useNavigate();
    const handleEnrollment = ()=>{
        navigate(`/myAssignments` , {state:{assignment}})
    }
    return(
        <div className="main-enrollment">
            <h2>Inscriere</h2>
            <p>
            <strong>Enrollment Deadline:</strong>{" "}
                {assignment.phases.length > 0 ? assignment.phases[0].deadline.toDateString() : "N/A"}
            </p>
            <button onClick={handleEnrollment}>Inscriere</button> 
        </div>
    )
}

export default EnrollmentPhaseCard;