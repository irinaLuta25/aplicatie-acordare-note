import React from "react";
import "./SidebarTeacher.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faTasks, faUsers, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function SidebarTeacher() {
  const location = useLocation();  // Obține calea URL-ului curent

  return (
    <div className="sidebar">
      <img src={logo} className="sidebar-logo" alt="Logo" />
      <ul className="sidebar-menu">
        <li>
          <Link 
            to="/teacherMyAssignments" 
            className={`sidebar-link ${location.pathname === "/teacherMyAssignments" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faTasks} className="menu-icon" /> My Assignments
          </Link>
        </li>
      </ul>
      <button className="sidebar-logout">
        <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> Logout
      </button>
    </div>
  );
}

export default SidebarTeacher;
