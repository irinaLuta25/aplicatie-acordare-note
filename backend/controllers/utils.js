const evaluationController = require("./evaluation");
const teamController = require("./team");
const userController = require("./user");
const phaseController = require("./phase");
const axios = require('axios')

const calculateDivisors = (totalNumberOfStudents) => {
    let nrd = 0;
    for (let d = 1; d < totalNumberOfStudents; d++) {
        if (totalNumberOfStudents % d == 0) {
            nrd++;
        }
    }
    return nrd;
}

const getAllDivisors = (totalNumberOfStudents) => {
    let nrd = 0;
    let array = [];
    for (let d = 1; d < totalNumberOfStudents; d++) {
        if (totalNumberOfStudents % d == 0) {
            array[nrd] = d;
            nrd++;
        }
    }
    return array;
}

const calculateNumberOfTeams = (totalNumberOfStudents) => {
    let numberOfTeams = 0;
    if (calculateDivisors(totalNumberOfStudents) == 2) { // nr e prim
        totalNumberOfStudents++;
    }
    let nrd = calculateDivisors(totalNumberOfStudents);
    let array = getAllDivisors(totalNumberOfStudents);
    let middlePoz = Math.ceil(nrd / 2);
    numberOfTeams = array[middlePoz];

    return numberOfTeams;
}

function getRandomItems(array, numItems) {
    const shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, numItems);
}

const createEvaluationStudent = async (phaseId, phaseIdForTeam) => {
    try {
        let newEvaluations = [];

        const responseEvaluations = await axios.get(`http://localhost:4848/api/evaluation/getAllStudentsByPhaseId/` + phaseId);

        let evaluationsForPhase = responseEvaluations.data;

        const teams = calculateNumberOfTeams(evaluationsForPhase.count);

        const studentsForTeam = Math.ceil(evaluationsForPhase.count / teams);
        let poz = 0;

        for (let i = 0; i < teams; i++) {
            let response = await axios.post(`http://localhost:4848/api/team/create`,
                { name: `Team ${i + 1}` }
            )

            let newTeam = response.data;

            let k = 0;
            while (k < studentsForTeam && poz < evaluationsForPhase.count) {
                const evaluationForPhase = evaluationsForPhase.rows[poz];

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

const createEvaluationJury = async (phaseIdForTeam) => {
    try {
        let evaluations = []
        const responseEvaluation = await axios.get(`http://localhost:4848/api/evaluation/getAllStudentsByPhaseId/` + phaseIdForTeam)
        const responsePhase = await axios.get(`http://localhost:4848/api/phase/` + phaseIdForTeam)

        let phase = responsePhase.data;
        const deadline = new Date(phase.deadline);
        console.log(deadline);

        let currentDate = new Date();
        console.log(currentDate);

        if ((deadline.getDate() == currentDate.getDate()) && (deadline.getMonth() == currentDate.getMonth()) && (deadline.getFullYear() == currentDate.getFullYear())) {
            let evaluationsForPhase = responseEvaluation.data;
            let totalStudentsFromPhase = evaluationsForPhase.rows.map((evaluation) => evaluation.userId);

            const responseTeam = await axios.get(`http://localhost:4848/api/team/getAllTeamsByPhaseId/` + phaseIdForTeam)
            let teamsForPhase = responseTeam.data;

            for (team of teamsForPhase) {
                let studentsFromTeam = team.evaluations.map(evaluation => evaluation.userId);

                let eligibleStudents = totalStudentsFromPhase.filter(student =>
                    !studentsFromTeam.includes(student));

                console.log(eligibleStudents);

                const numberOfMembersInJury = Math.ceil(evaluationsForPhase.count / teamsForPhase.length);

                let jury = getRandomItems(eligibleStudents, numberOfMembersInJury);
                for (memberOfJury of jury) {
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
        }

        return evaluations;

    } catch (err) {
        throw err;
    }
}

const calculateGrades = async (phaseId) => {
    try {
        const responseTeam = await axios.get(`http://localhost:4848/api/team/getAllTeamsByPhaseId/` + phaseId)
        let teamsForPhase = responseTeam.data;
        let updatedEvaluations=[];
        
        for (team of teamsForPhase) {
            let grades = team.evaluations.filter(evaluation => evaluation.role == "JURY").map(evaluation => evaluation.grade);
            let evaluationsStudents=team.evaluations.filter(evaluation=>evaluation.role=="student");
            let finalGrade=0;
           
            if (grades.length > 2) {
                let eligibleGrades = grades.filter((grade) => grade !== Math.min(...grades) && grade !== Math.max(...grades));
                finalGrade= eligibleGrades.reduce((acc, val) => acc + val, 0) / eligibleGrades.length;
            } else {
                finalGrade = grades.reduce((acc, val) => acc + val, 0) / grades.length;
            }  

            for(evaluatedStudent of evaluationsStudents){
                let responseUpdate=await axios.put(`http://localhost:4848/api/evaluation/update/` + evaluatedStudent.id,
                    {
                        grade:finalGrade,
                        userId:evaluatedStudent.userId,
                        teamId:evaluatedStudent.teamId,
                        phaseId:phaseId,
                        role:evaluatedStudent.role
                    }
                );

                let updatedEvaluation=responseUpdate.data;
                updatedEvaluations.push(updatedEvaluation);

            }
        }

        return updatedEvaluations;
    } catch (err) {
        throw err;
    }
}

const visualizeGradesByTeachers = async(phaseId,phaseIdForWatching)=>{
    try{
        const responseTeachers= await axios.get(`http://localhost:4848/api/evaluation/getAllTeachersByPhaseId/`+phaseId);
        const teachers=responseTeachers.data;

        const responseTeam = await axios.get(`http://localhost:4848/api/team/getAllTeamsByPhaseId/` + phaseIdForWatching)
        let teamsForPhase = responseTeam.data;
        let teamGrades = {};
        let totalGrades=[];
    
        for(team of teamsForPhase){
            let evaluationJury=team.evaluations.filter(evaluation=>evaluation.role=="JURY");   
            let grades = evaluationJury.map((jury) => jury.grade);
            let teamGrades={
                id: team.id,
                totalGrades:grades
            }
            totalGrades.push(teamGrades);
            console.log(totalGrades);
        }
         
        return totalGrades;
    }
    catch(err){
        throw err;
    }
}

module.exports = { 
    createEvaluationStudent, 
    createEvaluationJury, 
    calculateGrades,
    visualizeGradesByTeachers
 };