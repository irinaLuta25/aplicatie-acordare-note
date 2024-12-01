const EvaluationDb = require("../models").Evaluation;

const controller = {
    addEvaluation: async(req,res) => {
        const evaluation = {
            grade:req.body.grade,
            userId:req.body.userId,
            teamId:req.body.teamId
        }

        try {
            const newEvaluation = await EvaluationDb.create(evaluation);
            res.status(200).send(newEvaluation);
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    getAll: async(req,res) => {
        try {
        const evaluations = await EvaluationDb.findAll();
        res.status(200).send(evaluations);
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
            grade:req.body.grade
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
    }

};

module.exports = controller;