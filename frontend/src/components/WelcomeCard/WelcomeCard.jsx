import React from "react";
import "./WelcomeCard.css";
import imgIntroduction from "../../assets/introduction.png"
import Cookies from "universal-cookie";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true; 
function WelcomeCard() {
  const cookies = new Cookies();

  let user = cookies.get("user");
  return (
    <div className="welcomeCard">
      <div className="welcomeCard-info">
        <h1>Welcome back, {user.firstName}!</h1>
        <p>Keep track of your assignments with your student application</p>
      </div>
      <div className="welcomeCard-image">
        <img
          src={imgIntroduction}
          className="image-student"
        />
      </div>
    </div>
  );
}

export default WelcomeCard;
