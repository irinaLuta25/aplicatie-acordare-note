import React, { useEffect } from 'react'
import "./TeacherMyAssignments.css"
import SidebarTeacher from "../../components/SidebarTeacher/SidebarTeacher";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import AssignmentCard from "../../components/AssignmentCard/AssignmentCard";
import { useNavigate,useLocation } from 'react-router-dom';
import { useState } from 'react';
import { getAllAssignmentsByUserId, visualizeGrades } from '../../API/Api';
import Cookies from "universal-cookie";


function TeacherMyAssignments() {
  const cookies = new Cookies();
  
  let user = cookies.get("user");
  const [assigments,setAssignments]=useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    visualizeGrades(user.id)
        .then(data => {
            setAssignments(data);
            
        })
        .catch(err => {
            console.error(err);
        });
}, []);

  const handler=()=>{
    navigate(`/createAssignment`);
  }
  const location=useLocation();
  const {assignment,subject}=location.state || "";

  
    return (
        <div className="courses">
          <div className="section2">
            <SidebarTeacher />
          </div>
          <div className="main-teacher">
        <HeaderProfile />
        <button className='btn-create' onClick={handler}>Create assignment</button>
         {assigments.map((assignment)=>(
            <AssignmentCard
              assignment={assignment}
            />
        ))}
         
        
      </div>
        </div>
      );
}

export default TeacherMyAssignments;