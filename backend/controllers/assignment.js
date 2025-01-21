const { where } = require("sequelize");
const PhaseDB = require("../models").Phase;
const TeamDB = require("../models").Team;
const EvaluationDB = require("../models").Evaluation;
const UserDB = require("../models").User;


const AssignmentDb = require("../models").Assignment;

const controller = {
    addAssignment: async (req, res) => {
        const assignment = {
            subject: req.body.subject,
            title: req.body.title,
            description: req.body.description,
        };

        try {
            const newAssignent = await AssignmentDb.create(assignment);
            res.status(200).send(newAssignent);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    getAll: async (req, res) => {
        try {
            const assignments = await AssignmentDb.findAll();
            res.status(200).send(assignments);
        } catch (err) {
            res.status(500).send(err.message);

        }
    },

    getAssignmentById: async (req, res) => {
        const id = req.params.id;
        try {
            const assignment = await AssignmentDb.findByPk(id);
            res.status(200).send(assignment);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    editAssignment: async (req, res) => {
        const id = req.params.id;
        const updatedAssignment = {
            subject: req.body.subject,
            title: req.body.title,
            description: req.body.description,
        };

        try {
            const assignment = await AssignmentDb.findByPk(id);
            if (assignment) {
                await assignment.update(updatedAssignment);
                res.status(200).send(assignment);
            }
        } catch (err) {
            res.status(500).send(err.message);

        }
    },

    deleteAssignment: async (req, res) => {
        const id = req.params.id;
        try {
            const assignment = await AssignmentDb.findByPk(id);
            if (assignment) {
                await assignment.destroy();
                res.status(200).send("S-a sters yey");
            }
        } catch (err) {
            res.status(500).send(err.message);

        }
    },
    getAllEvaluationsByAssignments: async (req, res) => {
        try {
            const assignments = await AssignmentDb.findAll({
                include: [{
                    model: PhaseDB,
                    required: true,
                    include: [{
                        model: EvaluationDB,
                        required: true,
                        where: { role: "JURY" },
                        include: [{
                            model: UserDB,
                            required: true,
                            where: { role: true },
                        },
                        {
                            model: TeamDB,
                            required: true,
                        }],
                    }],
                }],
            });
            res.status(200).send(assignments);
        } catch (err) {
            res.status(500).send(err.message);

        }
    },

    getAllAssignmentsByPhases: async (req, res) => {
        try {
            const assignments = await AssignmentDb.findAll({
                include: [{
                    model: PhaseDB,
                    required: true,
                    order:["id", "ASC"]
                }],
            });
            res.status(200).send(assignments);
        } catch (err) {
            res.status(500).send(err.message);

        }

    },

    getAllAssignmentsByUserId: async(req,res)=>{
        let id=req.params.id;
        try {
            const assignments = await AssignmentDb.findAll({
                include: [{
                    model: PhaseDB,
                    required: true,
                    order:["id", "ASC"],
                    include:[{
                        model:EvaluationDB,
                        required: true,
                        where:{userId:id}
                    }]
                }],
            });
            res.status(200).send(assignments);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = controller;