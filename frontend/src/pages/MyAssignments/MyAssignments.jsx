import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import AssignmentCard from "../../components/AssignmentCard/AssignmentCard";
import { useLocation } from "react-router-dom";
import "./MyAssignments.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { getAllAssignmentsByUserId } from "../../API/Api";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true;

function MyAssignments() {
  const cookies = new Cookies();
  let user = cookies.get("user");

  const [assignments, setAssignments] = useState([]);

  const assignmentsList = () => {
    getAllAssignmentsByUserId(user.id)
      .then((res) => {
        if (res.status === 200) {
          setAssignments(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      })
  }

  useEffect(() => {
    assignmentsList();
  }, []);

  return (
    <div className="courses">
      <div className="section2">
        <Sidebar />
      </div>
      <div className="main-my-assignments">
        <HeaderProfile />

        {assignments ? (assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
          />
        ))) : (
          <p>No assignments.</p>
        )}

      </div>
    </div>
  );
}

export default MyAssignments;
