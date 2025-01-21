import React from "react";
import { Routes, Route } from "react-router-dom";
import Courses from "./pages/Courses/Courses";
import MyAssignments from "./pages/MyAssignments/MyAssignments";
import EvaluationPhases from "./pages/EvaluationPhases/EvaluationPhases";
import AssignmentPhases from "./pages/AssignmentPhases/AssignmentPhases";
import PhaseEvaluation from "./pages/PhaseEvaluation/PhaseEvaluation";
import Login from "./pages/Login/Login";
import TeacherMyAssignments from "./pages/TeacherMyAssignments/TeacherMyAssignments";
import CreateAssignment from "./pages/CreateAssignment/CreateAssignment"
import SeePhasesAndGrades from "./pages/SeePhasesAndGrades/SeePhasesAndGrades"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Courses />} />
      <Route path="/login" element={<Login />} />
      <Route path="/myAssignments" element={<MyAssignments />} />
      <Route path="/evaluationPhases" element={<EvaluationPhases />} />
      <Route path="/assignment/:id" element={<AssignmentPhases />} />
      <Route path="/evaluation/:id" element={<PhaseEvaluation />} />
      <Route path="/teacherMyAssignments" element={<TeacherMyAssignments />} />
      <Route path="/createAssignment" element={<CreateAssignment />} />
      <Route path="/seePhases" element={<SeePhasesAndGrades />} />
    </Routes>
  );
}

export default App;
