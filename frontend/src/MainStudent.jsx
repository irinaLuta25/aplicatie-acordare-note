import React from "react";
import Cookies from "universal-cookie";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Courses from "./pages/Courses/Courses";
import MyAssignments from "./pages/MyAssignments/MyAssignments";
import EvaluationPhases from "./pages/EvaluationPhases/EvaluationPhases";
import AssignmentPhases from "./pages/AssignmentPhases/AssignmentPhases";
import PhaseEvaluation from "./pages/PhaseEvaluation/PhaseEvaluation";

function MainStudent() {
    const cookies = new Cookies();

    let user = cookies.get("user");
    console.log(user);

    return (
        <Routes>
          <Route path="/student" element={<Courses />} />
          <Route path="/myAssignments" element={<MyAssignments />} />
          <Route path="/evaluationPhases" element={<EvaluationPhases />} />
          <Route path="/assignment/:id" element={<AssignmentPhases />} />
          <Route path="/evaluation/:id" element={<PhaseEvaluation />} />
        </Routes>
      );
}

export default MainStudent;
