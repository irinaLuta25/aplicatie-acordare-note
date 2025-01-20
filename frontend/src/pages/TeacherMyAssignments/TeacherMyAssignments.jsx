import React from 'react'
import "./TeacherMyAssignments.css"
import SidebarTeacher from "../../components/SidebarTeacher/SidebarTeacher";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import AssignmentCard from "../../components/AssignmentCard/AssignmentCard";
import { useNavigate } from 'react-router-dom';

function TeacherMyAssignments() {
  const navigate=useNavigate();
  const handler=()=>{
    navigate(`/createAssignment`);
  }
    return (
        <div className="courses">
          <div className="section2">
            <SidebarTeacher />
          </div>
          <div className="main">
        <HeaderProfile />
        <button className='btn-create' onClick={handler}>Create assignment</button>
        {/* {currentAssignment ? (
          <AssignmentCard
            key={currentAssignment.assignment_id}
            assignment={currentAssignment}
          />
        ) : (
          <p>Nu există assignment.</p> 
        )} */}
      </div>
        </div>
      );
}

export default TeacherMyAssignments;