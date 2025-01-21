import React from "react";
import { Routes, Route } from "react-router-dom";
import Courses from "./pages/Courses/Courses";
import MyAssignments from "./pages/MyAssignments/MyAssignments";
import EvaluationPhases from "./pages/EvaluationPhases/EvaluationPhases";
import AssignmentPhases from "./pages/AssignmentPhases/AssignmentPhases";
import PhaseEvaluation from "./pages/PhaseEvaluation/PhaseEvaluation";
import Login from "./pages/Login/Login";
import TeacherMyAssignments from "./pages/TeacherMyAssignments/TeacherMyAssignments";
import CreateAssignment from "./pages/CreateAssignment/CreateAssignment";
import SeePhasesAndGrades from "./pages/SeePhasesAndGrades/SeePhasesAndGrades";
import Cookies from "universal-cookie";
import MainTeacher from "./MainTeacher";
import MainStudent from "./MainStudent";

import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true; //

function App() {
  const cookies = new Cookies();

  let user = cookies.get("user");
  console.log(user);

  if (user == undefined)
    return (
      // <Routes>
      //     <Route path="/" element={<Login />} />
      // </Routes>
      <div>
        <Login />
      </div>
    );
  else if (user.role == 1) {
    return (
      <>
        <MainStudent />
      </>
    );
  } else {
    return (
      <>
        <MainTeacher />
      </>
    );
  }
}

export default App;
