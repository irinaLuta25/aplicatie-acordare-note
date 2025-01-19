import React from "react";
import { Routes, Route } from "react-router-dom";
import Courses from "./pages/Courses/Courses";
import MyAssignments from "./pages/MyAssignments/MyAssignments";
import EvaluationPhases from "./pages/EvaluationPhases/EvaluationPhases";
import Assignment from "./pages/Assignment/Assignment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/myAssignments" element={<MyAssignments />} />
      <Route path="/evaluationPhases" element={<EvaluationPhases />} />
      <Route path="/assignment/:id" element={<Assignment />} />
    </Routes>
  );
}

export default App;
