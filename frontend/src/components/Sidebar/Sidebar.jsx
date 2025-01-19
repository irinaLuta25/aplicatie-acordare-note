import React from "react";
import "./Sidebar.css";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faTasks, faUsers, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <div className="sidebar">
      <img src={logo} className="sidebar-logo" alt="Logo" />
      <ul className="sidebar-menu">
        <li>  <Link to="/" className="sidebar-link" id="onPage"><FontAwesomeIcon icon={faBook} className="menu-icon" /> Assignments  </Link></li>
        <li> <Link to="/myAssignments" className="sidebar-link"><FontAwesomeIcon icon={faTasks} className="menu-icon" /> My Assignments </Link></li>
        <li> <Link to="/evaluationPhases" className="sidebar-link"><FontAwesomeIcon icon={faUsers} className="menu-icon" /> Evaluation Phases </Link></li>
      </ul>
      <button className="sidebar-logout"> <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" /> Logout </button>
    </div>
  );
}

export default Sidebar;
