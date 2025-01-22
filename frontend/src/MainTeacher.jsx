import React from "react";
import Cookies from "universal-cookie";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TeacherMyAssignments from "./pages/TeacherMyAssignments/TeacherMyAssignments";
import CreateAssignment from "./pages/CreateAssignment/CreateAssignment";
import SeePhasesAndGrades from "./pages/SeePhasesAndGrades/SeePhasesAndGrades";

function MainTeacher() {
    const cookies = new Cookies();

    let user = cookies.get("user");

    return (
        <Routes>
          <Route path="/teacherMyAssignments" element={<TeacherMyAssignments />} />
          <Route path="/createAssignment" element={<CreateAssignment />} />
          <Route path="/seePhases/:id" element={<SeePhasesAndGrades />} />
        </Routes>
      );
}

export default MainTeacher;
