const evaluationController = require("./evaluation");
const teamController = require("./team");
const userController = require("./user");
const phaseController = require("./phase");
const createEvaluationStudent = require("./utils").createEvaluationStudent;
const createEvaluationJury = require("./utils").createEvaluationJury;
const calculateGrades = require("./utils").calculateGrades;
const visualizeGradesByTeachers=require("./utils").visualizeGradesByTeachers;

const serviceController = {
    createEvaluationStudent: async (req, res) => {
        const { phaseId , phaseIdForTeam } = req.params;
        try {
            const evaluations = await createEvaluationStudent(phaseId,phaseIdForTeam);
            console.log(evaluations)
            res.status(200).send(evaluations);
        } catch (err) {
            console.error("Error creating evaluations:", err.message);
            res.status(500).send(err.message);
        }
    },

    createEvaluationJury: async (req, res) => {
        const {phaseId}=req.params;
        try {
            const evaluations=await createEvaluationJury(phaseId);
            res.status(200).send(evaluations);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    calculateGrades: async (req, res) => {
        const {phaseId}=req.params;
        try {
            const updatedEvaluations=await calculateGrades(phaseId);
            res.status(200).send(updatedEvaluations);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    visualizeGradesByTeachers: async(req,res)=>{
        const {phaseId,phaseIdForWatching}=req.params;
        try{
            const info=await visualizeGradesByTeachers(phaseId,phaseIdForWatching);
            res.status(200).send(info);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}


module.exports = serviceController;