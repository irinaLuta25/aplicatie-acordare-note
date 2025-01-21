import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard";
import Assignments from "../../components/Assignments/Assignments";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import "./Courses.css";


function Courses() {
  return (
    <div className="courses">
      <div className="section2">
      <Sidebar />
      </div>
      <div className="main-courses">
        <HeaderProfile/>
        <WelcomeCard />
        <Assignments />
      </div>
    </div>
  );
}

export default Courses;
