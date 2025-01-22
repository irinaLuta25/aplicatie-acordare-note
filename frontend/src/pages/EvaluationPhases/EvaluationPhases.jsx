import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import HeaderProfile from "../../components/HeaderProfile/HeaderProfile";
import EvaluationCard from "../../components/EvaluationCard/EvaluationCard";
import "./EvaluationPhases.css";

import Cookies from "universal-cookie";
import axios from "axios";
import { getAllEvaluationsByAssignmentsByUserId } from "../../API/Api";
import { useState, useEffect } from "react";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true;


function EvaluationPhases() {
  const cookies = new Cookies();

  let user = cookies.get("user");
  const [evaluationsState, setEvaluationsState] = useState([]);

  const evaluationsList = () => {
    getAllEvaluationsByAssignmentsByUserId(user.id)
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          setEvaluationsState(res.data);
        }
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    evaluationsList();
  }, [])


  return (
    <div className="courses">
      <div className="section2">
        <Sidebar />
      </div>
      <div className="main-evaluation">
        <HeaderProfile />
        {console.log(evaluationsState)}
        <div className="evaluations">
          <h2>Evaluations</h2>
          <div className="evaluation-grid">
            {evaluationsState.map((evaluation) => (
              <EvaluationCard key={evaluation.id} evaluation={evaluation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EvaluationPhases;
