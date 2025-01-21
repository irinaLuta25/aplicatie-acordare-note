import React from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faTasks, faUsers, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();  // Obține calea URL-ului curent

  const logout = async () => {
    await window.open("http://localhost:4848/api/auth/logout", "_self");
	};

  return (
    <div className="sidebar">
      <img src={logo} className="sidebar-logo" alt="Logo" />
      <ul className="sidebar-menu">
        <li>
          <Link 
            to="/student" 
            className={`sidebar-link ${location.pathname === "/" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faBook} className="menu-icon" /> Assignments
          </Link>
        </li>
        <li>
          <Link 
            to="/myAssignments" 
            className={`sidebar-link ${location.pathname === "/myAssignments" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faTasks} className="menu-icon" /> My Assignments
          </Link>
        </li>
        <li>
          <Link 
            to="/evaluationPhases" 
            className={`sidebar-link ${location.pathname === "/evaluationPhases" ? "active" : ""}`}
          >
            <FontAwesomeIcon icon={faUsers} className="menu-icon" /> Evaluation Phases
          </Link>
        </li>
      </ul>
      <button className="sidebar-logout" onClick={logout}>
        <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> Logout
      </button>
    </div>
  );
}

export default Sidebar;
