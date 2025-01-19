import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard";
import MyAssignmentsCards from "../../components/MyAssignmentsCards/MyAssignmentsCards";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import "./MyAssignments.css";


function MyAssignments() {
  return (
    <div className="courses">
      <div className="section2">
      <Sidebar />
      </div>
      <div className="main">
        <HeaderProfile/>
        <MyAssignmentsCards />
      </div>
    </div>
  );
}

export default MyAssignments;
