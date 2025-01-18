const EvaluationDb = require("../models").Evaluation;
const TeamDb=require("../models").Team;


const controller = {
    addEvaluation: async(req,res) => {
        const evaluation = {
            grade:req.body.grade,
            userId:req.body.userId,
            teamId:req.body.teamId,
            phaseId:req.body.phaseId,
            role:req.body.role
        }

        try {
            const newEvaluation = await EvaluationDb.create(evaluation);
            res.status(200).send(newEvaluation);
            return newEvaluation;
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    getAll: async(req,res) => {
        try {
        const evaluations = await EvaluationDb.findAll();
        res.status(200).send(evaluations);
        return evaluations;
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    getEvaluationBydId: async(req,res) => {
        const id = req.params.id;
        try {
        const evaluation = await EvaluationDb.findByPk(id);
        res.status(200).send(evaluation);
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    editEvaluation: async(req,res) => {
        const id = req.params.id;

        const updatedEvaluation = {
            grade:req.body.grade,
            userId:req.body.userId,
            teamId:req.body.teamId,
            phaseId:req.body.phaseId,
            role:req.body.role
        }

        try {
            const evaluation = await EvaluationDb.findByPk(id);

            if(evaluation) {
                await evaluation.update(updatedEvaluation);
                res.status(200).send(evaluation);
            }

        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    deleteEvaluation: async(req,res) => {
        const id = req.params.id;

        try {
            const evaluation = await EvaluationDb.findByPk(id);

            if(evaluation) {
                await evaluation.destroy();
                res.status(200).send("S-a sters");
            }
        } catch(err) {
            res.status(500).send(err.message);
        }
    },
    getAllStudentsByPhaseId: async (req,res) => {
        const { phaseId } = req.params;
    
        if (!phaseId) {
            throw new Error("No phase ID provided.");
        }
    
        try {
            const students = await EvaluationDb.findAndCountAll({
                where: { phaseId },
                include: [{
                    association: 'user',
                    required: true,
                    where: { role: true },
                }],
            });
            res.status(200).send(students)
            return students;
        } catch (err) {
            res.status(500).send(err)
        }
    },
    getAllTeachersByPhaseId: async (req,res) => {
        const { phaseId } = req.params;
    
        if (!phaseId) {
            throw new Error("No phase ID provided.");
        }
    
        try {
            const teachers = await EvaluationDb.findAndCountAll({
                where: { phaseId },
                include: [{
                    association: 'user',
                    required: true,
                    where: { role: false },
                }],
            });
            res.status(200).send(teachers)
            return teachers;
        } catch (err) {
            res.status(500).send(err)
        }
    },
   

};

module.exports = controller;