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

    getAllStudentsByAssignmentId: async(req)=>{
        const id=req.body.assignmentId;
        try{
            const students=await UserAssignmentDb.findAndCountAll({
                where:{
                    assignmentId:id
                },
                include:[{
                    association:'user',
                    required:true,
                    where:{role:true}
               }]
            });
            return students;
            console.log(students);
        }catch(err){
           throw err;
        }
    }

};

module.exports = controller;