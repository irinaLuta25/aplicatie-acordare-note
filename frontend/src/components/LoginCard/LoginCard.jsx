import React from "react";
import "./LoginCard.css";
import iconGoogle from "../../assets/iconGoogle.png"
import loginImage from "../../assets/loginImage.png"


function LoginCard() {
  const googleAuth = async (e) => {
    e.preventDefault()
    await window.open(`http://localhost:4848/api/auth/google/`, "_self");
}

  return (
      <div className="login-card">
        <img
            className="login-image"
            src={loginImage}
          />
        <h2>Login Now</h2>
        <button onClick={(e)=>googleAuth(e)} className="google-button">
          <img
            src={iconGoogle}
            alt="Google logo"
          />
          Google
        </button>
      </div>
  );
}

export default LoginCard;
