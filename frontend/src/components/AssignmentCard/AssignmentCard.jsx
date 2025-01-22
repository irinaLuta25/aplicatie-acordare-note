import React from "react";
import "./AssignmentCard.css";
import image from '../../assets/opening_book.png'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import Cookies from "universal-cookie";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true;

function AssignmentCard({ assignment }) {
  const cookies = new Cookies();

  let user = cookies.get("user");
  const navigate = useNavigate();
  const [newAssignment, setNewAssignment] = useState();

  const handlerClick = () => {
    if(user.role==1){
      navigate(`/assignment/${assignment.id}`, { state: { assignment } })
      setNewAssignment(assignment);
    }else{
      navigate(`/seePhases/${assignment.id}`, { state: { assignment } })
    }
  }
  return (
    <div className="assignment-card">
      <img src={image} className="assignment-icon" />
      <h3>{assignment.title}</h3>
      <button onClick={handlerClick}>View</button>
    </div>
  );
}

export default AssignmentCard;
