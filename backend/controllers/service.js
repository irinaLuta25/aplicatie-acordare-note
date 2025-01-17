const evaluationController = require("./evaluation");
const teamController = require("./team");
const userController = require("./user");
const userAssignmentController = require("./userAssignment");
const calculateNumberOfTeams = require("./utils").calculateNumberOfTeams;

const serviceController = {
    createEvaluationStudent: async (req, res) => {
        try {
            let evaluations = [];
            const assignmentIdReq={body:{assignmentId:1}};
            const students = await userAssignmentController.getAllStudentsByAssignmentId(assignmentIdReq);
            console.log("Students:", students);
            console.log("Number of Students:", students.count);

            const teams = calculateNumberOfTeams(students.count);

            console.log("Number of teams:", teams);

            const studentsForTeam = students.count / teams;
            let poz = 0;

            for (let i = 0; i < teams; i++) {
                const teamReq = { body: { name: `Team ${i + 1}` } };
                const teamRes = {
                    status: () => teamRes,
                    send: (data) => data,
                };
                const newTeam = await teamController.addTeam(teamReq, teamRes);
                console.log("New team created:", newTeam);
                console.log("id team:", newTeam.id);

                
                let k = 0;
                while (k < studentsForTeam && poz < students.count) {
                    console.log(poz);
                    const student = students.rows[poz];  
                    console.log("Assigning student:", student);

                    const evaluationReq = {
                        body:
                        {
                            grade: 0,
                            userId: student.id,
                            teamId: newTeam.id,
                            role: "student",
                        }
                    };
                    const evaluationRes = {
                        status: () => evaluationRes,
                        send: (data) => data,
                    };
                    const newEvaluation = await evaluationController.addEvaluation(evaluationReq, evaluationRes);
                    console.log("New evaluation created:", newEvaluation);

                    evaluations.push(newEvaluation);
                    k++;
                    poz++;
                }
            }

            console.log("Evaluations created:", evaluations);
            res.status(200).send(evaluations);
        } catch (err) {
            console.error("Error:", err.message);
            res.status(500).send(err.message);
        }
    },
    
    createEvaluationJury: async (req, res) => {
        try {
            let evaluations = [];
    
            // Obține toți studenții din baza de date
            const students = await userAssignmentController.getAllStudentsByAssignmentId();
    
            // Calculează numărul de echipe pe baza numărului total de studenți
            const teams = calculateNumberOfTeams(students.count);
    
            console.log("Number of teams:", teams);
    
            // Determină numărul de studenți per echipă
            const studentsForTeam = Math.floor(students.count / teams);
    
            // Obține toate echipele existente
            const getTeams = await teamController.getAll();
    
            // Obține toate evaluările existente pentru a verifica membrii echipelor și jurații existenți
            const getEvaluation = await evaluationController.getAll();
    
            // Set pentru a urmări studenții deja alocați ca juriu
            const assignedJury = new Set();
    
            // Copie a listei studenților, pentru a preveni modificarea listei originale
            let remainingStudents = [...students.rows];
    
            for (const team of getTeams) {
                console.log(`Processing jury for team: ${team.name}`);
    
                let juryForTeam = [];
                let count = 0;
    
                // Selectează studenții nealocați pentru echipa curentă
                while (count < studentsForTeam && remainingStudents.length > 0) {
                    const student = remainingStudents.pop(); // Ia ultimul student din listă
                    let isInTeam = false;
    
                    // Verifică dacă studentul este membru al echipei curente
                    for (let j = 0; j < getEvaluation.length; j++) {
                        const evaluation = getEvaluation[j];
                        if (
                            evaluation.userId === student.id &&
                            evaluation.teamId === team.id &&
                            evaluation.role === "student"
                        ) {
                            isInTeam = true;
                            break;
                        }
                    }
    
                    // Verifică dacă studentul este deja jurat
                    if (!isInTeam && !assignedJury.has(student.id)) {
                        juryForTeam.push(student);
                        assignedJury.add(student.id); // Marchează studentul ca alocat
                        count++;
                    }
                }
    
                // Dacă echipa nu are suficienți membri juriu, reutilizează studenți
                while (juryForTeam.length < studentsForTeam) {
                    for (const student of students.rows) {
                        if (
                            !juryForTeam.some(jury => jury.id === student.id) &&
                            !assignedJury.has(student.id)
                        ) {
                            juryForTeam.push(student);
                            assignedJury.add(student.id);
                            if (juryForTeam.length >= studentsForTeam) {
                                break;
                            }
                        }
                    }
                }
    
                console.log(`Jury for team ${team.name}:`, juryForTeam);
    
                // Creează evaluări pentru fiecare membru al juriului
                for (const juryMember of juryForTeam) {
                    const evaluationReq = {
                        body: {
                            grade: 0,
                            userId: juryMember.id,
                            teamId: team.id,
                            role: "jury",
                        },
                    };
                    const evaluationRes = {
                        status: () => evaluationRes,
                        send: (data) => data,
                    };
                    const newEvaluation = await evaluationController.addEvaluation(evaluationReq, evaluationRes);
                    evaluations.push(newEvaluation);
                }
            }
    
            // Returnează evaluările juriului
            res.status(200).send({ evaluations });
        } catch (err) {
            console.error("Error:", err.message);
            res.status(500).send(err.message);
        }
    }
    
} 


module.exports = serviceController;