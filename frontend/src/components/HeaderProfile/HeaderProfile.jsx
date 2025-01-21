import React from "react";
import profilePic from "../../assets/user.png";
import "./HeaderProfile.css";

function HeaderProfile() {
  return (
    <div className="profile-container">
      <img src={profilePic} alt="Profile" className="profile-picture" />
        <span>John Doe</span>
    </div>
  );
}

export default HeaderProfile;
