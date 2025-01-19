import React from "react";
import "./WelcomeCard.css";
import imgIntroduction from "../../assets/introduction.png"

function WelcomeCard() {
  return (
    <div className="welcomeCard">
      <div className="welcomeCard-info">
        <h1>Welcome back, John!</h1>
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
