import React, { useEffect } from 'react'
import "./TeacherMyAssignments.css"
import SidebarTeacher from "../../components/SidebarTeacher/SidebarTeacher";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import AssignmentCard from "../../components/AssignmentCard/AssignmentCard";
import { useNavigate,useLocation } from 'react-router-dom';
import { useState } from 'react';

function TeacherMyAssignments() {
  const [assignmentState,setAssignmentState]=useState({});

  const navigate=useNavigate();
  const handler=()=>{
    navigate(`/createAssignment`);
  }
  const location=useLocation();
  const {assignment,subject}=location.state || "";

  useEffect(() => {
    if (location.state) {
      setAssignmentState({
        title: location.state.assignment, 
        subject: location.state.subject
      });
    }
  }, [location.state]);
  
    return (
        <div className="courses">
          <div className="section2">
            <SidebarTeacher />
          </div>
          <div className="main-teacher">
        <HeaderProfile />
        <button className='btn-create' onClick={handler}>Create assignment</button>
        {assignmentState ? (
          <AssignmentCard
            assignment={assignmentState}
          />
        ) : (
          <p>Nu există assignment.</p> 
        )}
      </div>
        </div>
      );
}

export default TeacherMyAssignments;