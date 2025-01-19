import "./Assignment.css";
import React from "react";
import { useLocation } from "react-router-dom";

function Assignment(){
    const location=useLocation();
    const {title} = location.state || {};
    return (
        <div>
            <h1>{title}</h1>
        </div>
    )
}

export default Assignment;