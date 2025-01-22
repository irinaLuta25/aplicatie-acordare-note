import axios from "axios";

axios.defaults.baseURL = "http://localhost:4848/api/";

export async function getAssignments() {
    return await axios.get("assignment/getAll", { "Content-Type": "application/json" });
}

export async function getAllEvaluationsByAssignmentsByUserId(id) {
    return await axios.get(`assignment/getAllEvaluationsByAssignmentsByUserId/${id}`, { "Content-Type": "application/json" });
}

export async function getAllAssignmentsByPhases() {
    return await axios.get("assignment/getAllAssignmentsByPhases", { "Content-Type": "application/json" });
}

export async function createEvaluation(evaluation) {
    return await axios.post("evaluation/create", evaluation, { "Content-Type": "application/json" });
}

export async function getAllAssignmentsByUserId(id) {
    return await axios.get(`assignment/getAllAssignmentsByUserId/${id}`, { "Content-Type": "application/json" });
}

export async function createAssignment(assignment) {
    return await axios.post(`assignment/create`, assignment, { "Content-Type": "application/json" });
}

export async function createPhase(phase) {
    return await axios.post(`phase/create`, phase, { "Content-Type": "application/json" });
}

export async function calculateDivisors(totalNumberOfStudents) {
    console.log(totalNumberOfStudents)
    let nrd = 0;
    for (let d = 1; d <= totalNumberOfStudents; d++) {
        if (totalNumberOfStudents % d == 0) {
            nrd++;
        }
    }
    console.log(nrd)
    return nrd;
}

export async function getAllDivisors(totalNumberOfStudents) {
    let nrd = 0;
    let array = [];
    for (let d = 1; d <= totalNumberOfStudents; d++) {
        if (totalNumberOfStudents % d == 0) {
            array[nrd] = d;
            nrd++;
        }
    }
    return array;
}



export async function calculateNumberOfTeams(totalNumberOfStudents) {
    console.log(totalNumberOfStudents)
    let numberOfTeams = 0;
    if (await calculateDivisors(totalNumberOfStudents) == 2) { // nr e prim
        totalNumberOfStudents++;
    }
    let nrd = await calculateDivisors(totalNumberOfStudents);
    console.log(nrd)
    let array = await getAllDivisors(totalNumberOfStudents);
    console.log(array)
    let middlePoz = Math.ceil(nrd / 2);
    console.log(middlePoz);
    numberOfTeams = array[middlePoz];
    console.log(numberOfTeams)
    return numberOfTeams;
}

export async function getRandomItems(array, numItems) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, numItems);
}

export async function createEvaluationStudent(phaseId, phaseIdForTeam) {
    try {
        let newEvaluations = [];

        const responseEvaluations = await axios.get(`http://localhost:4848/api/evaluation/getAllStudentsByPhaseId/` + phaseId);

        let evaluationsForPhase = responseEvaluations.data;
        console.log(evaluationsForPhase.count);
        const teams = await calculateNumberOfTeams(evaluationsForPhase.count);
        console.log(teams);

        const studentsForTeam = Math.ceil(evaluationsForPhase.count / teams);
        console.log(studentsForTeam)
        let poz = 0;

        for (let i = 0; i < teams; i++) {
            console.log(`Crearea echipei ${i + 1} din ${teams}`);
            let response = await axios.post(`http://localhost:4848/api/team/create`,
                { name: `Team ${i + 1}` }
            )

            let newTeam = response.data;

            let k = 0;
            while (k < studentsForTeam && poz < evaluationsForPhase.count) {
                const evaluationForPhase = evaluationsForPhase.rows[poz];
                console.log(`Alocare student ${evaluationForPhase.userId} la echipa ${newTeam.id}`);

                const evalRes = await axios.post(`http://localhost:4848/api/evaluation/create`, {
                    grade: 0,
                    userId: evaluationForPhase.userId,
                    teamId: newTeam.id,
                    phaseId: phaseIdForTeam,
                    role: "student",

                });

                const newEvaluation = evalRes.data;

                newEvaluations.push(newEvaluation);
                k++;
                poz++;
            }
        }

        return newEvaluations;
    } catch (err) {
        throw err;
    }
};

export async function createEvaluationJury(phaseIdForTeam) {
    try {
        let evaluations = []
        const responseEvaluation = await axios.get(`http://localhost:4848/api/evaluation/getAllStudentsByPhaseId/` + phaseIdForTeam)
        const responsePhase = await axios.get(`http://localhost:4848/api/phase/` + phaseIdForTeam)

        let phase = responsePhase.data;
        const deadline = new Date(phase.deadline);
        console.log("laallalallalallalala");

        let currentDate = new Date();
        console.log(currentDate);

        
            let evaluationsForPhase = responseEvaluation.data;
            let totalStudentsFromPhase = evaluationsForPhase.rows.map((evaluation) => evaluation.userId);

            const responseTeam = await axios.get(`http://localhost:4848/api/team/getAllTeamsByPhaseId/` + phaseIdForTeam)
            let teamsForPhase = responseTeam.data;

            for (let team of teamsForPhase) {
                let studentsFromTeam = team.evaluations.map(evaluation => evaluation.userId);

                let eligibleStudents = totalStudentsFromPhase.filter(student =>
                    !studentsFromTeam.includes(student));

                console.log(eligibleStudents);

                const numberOfMembersInJury = Math.ceil(evaluationsForPhase.count / teamsForPhase.length);

                let jury = await getRandomItems(eligibleStudents, numberOfMembersInJury);
                for (let memberOfJury of jury) {
                    const evalRes = await axios.post(`http://localhost:4848/api/evaluation/create`, {
                        grade: 0,
                        userId: memberOfJury,
                        teamId: team.id,
                        phaseId: phaseIdForTeam,
                        role: "JURY",
                    });
                    let newEvaluation = evalRes.data;
                    evaluations.push(newEvaluation);
                }
            }
        

        return evaluations;

    } catch (err) {
        throw err;
    }
}

export async function calculateGrades(phaseId, userId) {
    try {
        const responseTeam = await axios.get(`http://localhost:4848/api/team/getAllTeamsByPhaseId/` + phaseId)
        let teamsForPhase = responseTeam.data;
        let finalGrade = 0;

        for (let team of teamsForPhase) {
            let grades = team.evaluations.filter(evaluation => evaluation.role == "JURY").map(evaluation => evaluation.grade);
            let evaluationsStudents = team.evaluations.filter(evaluation => evaluation.role == "student");

            if (evaluationsStudents.some(ev => ev.userId = userId)) {
                console.log("caca")
                if (grades.length > 2) {
                    let eligibleGrades = grades.filter((grade) => grade !== Math.min(...grades) && grade !== Math.max(...grades));
                    finalGrade = eligibleGrades.reduce((acc, val) => acc + val, 0) / eligibleGrades.length;
                    

                } else {
                    finalGrade = grades.reduce((acc, val) => acc + val, 0) / grades.length;
                    console.log("AAAAAAA "+finalGrade)
                }

                for (let evaluatedStudent of evaluationsStudents) {
                    let responseUpdate = await axios.put(`http://localhost:4848/api/evaluation/update/` + evaluatedStudent.id,
                        {
                            grade: finalGrade,
                            userId: evaluatedStudent.userId,
                            teamId: evaluatedStudent.teamId,
                            phaseId: phaseId,
                            role: evaluatedStudent.role
                        }
                    );

                    
                }
                break;
            }

        }
        console.log(finalGrade);
        return finalGrade;
    } catch (err) {
        throw err;
    }
}

export async function visualizeGrades(userId) {
    try {
        let totalGrades = [];
        let assignmentsArray = [];

        const response = await axios.get(`http://localhost:4848/api/assignment/getAllAssignmentsByUserId/${userId}`);
        const assignments = response.data;

        for (let assignment of assignments) {
            let ass = {
                id: assignment.id,
                subject: assignment.subject,
                title: assignment.title,
                description: assignment.description,
                phases: []
            };

            for (let i = 1; i < assignment.phases.length; i++) {
                let phase = assignment.phases[i];
                const responseTeam = await axios.get(`http://localhost:4848/api/team/getAllTeamsByPhaseId/` + phase.id);
                let teamsForPhase = responseTeam.data;

                let phaseObj = {
                    id: phase.id,
                    name: phase.name,
                    deadline: phase.deadline,
                    description: phase.description,
                    grades: []
                };

                for (let team of teamsForPhase) {
                    let evaluationJury = team.evaluations.filter(evaluation => evaluation.role === "JURY");
                    let grades = evaluationJury.map((jury) => jury.grade);

                    let teamGrades = {
                        id: team.id,
                        name: team.name,
                        totalGrades: grades
                    };

                    phaseObj.grades.push(teamGrades);
                }

                ass.phases.push(phaseObj);
            }

            assignmentsArray.push(ass);
        }

        return assignmentsArray;
    }
    catch (err) {
        console.error("Error in visualizeGrades:", err);
        throw err;
    }

}

export async function getAllTeamsByPhaseId(phaseId) {
    return await axios.get(`/team/getAllTeamsByPhaseId/${phaseId}`, { "Content-Type": "application/json" })
}
export async function getAllTeamsByPhaseIdByUser(phaseId) {
    return await axios.get(`/team/getAllTeamsByPhaseIdByUser/${phaseId}`, { "Content-Type": "application/json" })
}
export async function getTeamStatus(phaseId) {
    return await axios.get(`/team/getTeamStatus/${phaseId}`, { "Content-Type": "application/json" })
}
export async function getJuryStatusByPhaseId(phaseId) {
    return await axios.get(`/evaluation/getJuryStatusByPhaseId/${phaseId}`, { "Content-Type": "application/json" })
}
export async function updateEvaluation(id, evaluation) {
    return await axios.put(`/evaluation/update/${id}`, evaluation, { "Content-Type": "application/json" })
}
export async function uploadPhases(payload) {
    return await axios.post(`/upload/`, payload, { "Content-Type": "multipart/form-data"})
}






