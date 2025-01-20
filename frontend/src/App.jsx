import React from "react";
import { Routes, Route } from "react-router-dom";
import Courses from "./pages/Courses/Courses";
import MyAssignments from "./pages/MyAssignments/MyAssignments";
import EvaluationPhases from "./pages/EvaluationPhases/EvaluationPhases";
import AssignmentPhases from "./pages/AssignmentPhases/AssignmentPhases";
import PhaseEvaluation from "./pages/PhaseEvaluation/PhaseEvaluation";
import Login from "./pages/Login/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/login" element={<Login />} />
      <Route path="/myAssignments" element={<MyAssignments />} />
      <Route path="/evaluationPhases" element={<EvaluationPhases />} />
      <Route path="/assignment/:id" element={<AssignmentPhases />} />
      <Route path="/evaluation/:id" element={<PhaseEvaluation />} />
    </Routes>
  );
}

export default App;
