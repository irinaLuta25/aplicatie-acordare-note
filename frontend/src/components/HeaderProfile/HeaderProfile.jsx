import React from "react";
import profilePic from "../../assets/user.png";
import "./HeaderProfile.css";
import Cookies from "universal-cookie";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true; 

function HeaderProfile() {
  const cookies = new Cookies();

  let user = cookies.get("user");
  return (
    <div className="profile-container">
      <img src={profilePic} alt="Profile" className="profile-picture" />
        <span>{user.firstName} {user.lastName}</span>
    </div>
  );
}

export default HeaderProfile;
