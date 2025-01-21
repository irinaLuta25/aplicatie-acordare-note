import React, { useEffect } from "react";
import AssignmentCard from "../AssignmentCard/AssignmentCard";
import { getAllAssignmentsByPhases } from "../../API/Api"; 
import { useState } from "react";
import "./Assignments.css";

function Assignments() {

    const [assignments,setAssignments]=useState([]);

    const assignmentsList=()=>{
        getAllAssignmentsByPhases()
        .then((res)=>{
            if(res.status===200){
                setAssignments(res.data);
            }
        })
        .catch((err)=>{
            console.error(err);
        })
    }

    useEffect(()=>{
        assignmentsList();
    },[]);

  return (
    <div className="assignments">
      <h2>Assignments</h2>
      <div className="assignment-grid">
        {assignments.map((assignment) => (
          <AssignmentCard key={assignment.id} assignment={assignment} />        
          ))} 
      </div>
    </div>
  );
}

export default Assignments;
