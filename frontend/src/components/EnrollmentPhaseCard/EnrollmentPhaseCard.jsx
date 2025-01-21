import React, { useState, useEffect } from "react";
import "./EnrollmentPhaseCard.css";
import { useNavigate } from "react-router-dom";
import { createEvaluation, getAllAssignmentsByUserId } from "../../API/Api";
import Cookies from "universal-cookie";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";
axios.defaults.withCredentials = true;

function EnrollmentPhaseCard({ assignment }) {
    const cookies = new Cookies();
    let user = cookies.get("user");

    const [evaluation, setEvaluation] = useState({
        grade: 0,
        userId: user.id,
        phaseId: assignment.phases[0]?.id,
        role: "student"
    });

    const [isEnrolled, setIsEnrolled] = useState(false);
    let navigate = useNavigate();

    useEffect(() => {
        getAllAssignmentsByUserId(user.id)
            .then((res) => {
                const assigned = res.data.some((assig) => assig.id === assignment.id);
                setIsEnrolled(assigned);
            })
            .catch((err) => {
                console.error("Error checking enrollment:", err);
            });
    }, [user.id, assignment.id]);

    const handleEnrollment = () => {
        createEvaluation(evaluation)
            .then(() => {
                toast.success('🦄 Successful enrollment! 🐊', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                setIsEnrolled(true);

                setTimeout(() => {
                    navigate("/myAssignments");
                }, 2000);
            })
            .catch((err) => {
                console.error(err);
                toast.error("Enrollment failed!", {
                    position: "top-right",
                    autoClose: 3000,
                });
            });
    };

    return (
        <div className="main-enrollment">
            <h2>Inscriere</h2>
            <p>
                <strong>Enrollment Deadline:</strong>{" "}
                {assignment.phases.length > 0 ? new Date(assignment.phases[0].deadline).toLocaleDateString("ro-RO") : "N/A"}
            </p>
            <button onClick={handleEnrollment} disabled={isEnrolled}>
                {isEnrolled ? "Already Enrolled" : "Inscriere"}
            </button>
            <ToastContainer />
        </div>
    );
}

export default EnrollmentPhaseCard;
