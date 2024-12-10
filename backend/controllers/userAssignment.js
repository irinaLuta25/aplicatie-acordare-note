const { where } = require("sequelize");
const { User } = require("../models");

const UserAssignmentDb = require("../models").UserAssignment;

const controller = {
    addUserAssignment: async(req,res) => {
        const userAssignment = {
            userId:req.body.userId,
            assignmentId:req.body.assignmentId,
        }

        try {
            const newUserAssignment = await UserAssignmentDb.create(userAssignment);
            res.status(200).send(newUserAssignment);
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    getAll: async(req,res) => {
        try {
        const userAssignments = await UserAssignmentDb.findAll();
        res.status(200).send(userAssignments);
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    getUserAssignmentBydId: async(req,res) => {
        const id = req.params.id;
        try {
        const userAssignment = await UserAssignmentDb.findByPk(id);
        res.status(200).send(userAssignment);
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    editUserAssignment: async(req,res) => {
        const id = req.params.id;

        const updatedUserAssignment = {
            userId:req.body.userId,
            assignmentId:req.body.assignmentId,
        }

        try {
            const userAssignment = await UserAssignmentDb.findByPk(id);

            if(userAssignment) {
                await userAssignment.update(updatedUserAssignment);
                res.status(200).send(userAssignment);
            }

        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    deleteUserAssignment: async(req,res) => {
        const id = req.params.id;

        try {
            const userAssignment = await UserAssignmentDb.findByPk(id);

            if(userAssignment) {
                await userAssignment.destroy();
                res.status(200).send("S-a sters");
            }
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    getAllStudents: async(req,res)=>{
        try{
            const students=await UserAssignmentDb.findAndCountAll({
               include:[{
                association:'user',
                required:true,
                where:{role:true}
               }]
            });
            res.status(200).send(students);
            console.log(students);
        }catch(err){
            res.status(500).send(err.message);
        }
    },
    getNumberOfTeams: async(req,res)=>{
        try{
            const studentsForAssignment=this.getAllStudents;
            console.log(studentsForAssignment);
            res.status(200).send(studentsForAssignment);
        }catch(err){
            res.status(500).send(err.message);
        }
    }

};

module.exports = controller;