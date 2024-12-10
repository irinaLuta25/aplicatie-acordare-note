const AssignmentDb = require("../models").Assignment;

const controller={
    addAssignment: async (req,res)=>{
        const assignment={
            subject:req.body.subject,
            title:req.body.title,
            description:req.body.description,
            enrollmentDeadline:req.body.enrollmentDeadline
        };

        try{
            const newAssignent = await AssignmentDb.create(assignment);
            res.status(200).send(newAssignent);
        }catch(err){
            res.status(500).send(err.message);
        }
    },

    getAll: async (req,res)=>{
        try{
            const assignments= await AssignmentDb.findAll();
            res.status(200).send(assignments);
        }catch(err){
            res.status(500).send(err.message);

        }
    },

    getAssignmentById: async(req,res)=>{
        const id = req.params.id;
        try{
            const assignment = await AssignmentDb.findByPk(id);
            res.status(200).send(assignment);
        }catch(err){
            res.status(500).send(err.message);
        }
    },

    editAssignment: async (req,res)=>{
        const id = req.params.id;
        const updatedAssignment ={
            subject:req.body.subject,
            title:req.body.title,
            description:req.body.description,
            enrollment_deadline:req.body.enrollment_deadline
        };

        try{
            const assignment = await AssignmentDb.findByPk(id);
            if(assignment){
                await assignment.update(updatedAssignment);
                res.status(200).send(assignment);
            }
        } catch (err){
            res.status(500).send(err.message);

        }
    },

    deleteAssignment: async(req,res)=>{
        const id = req.params.id;
        try{
            const assignment = await AssignmentDb.findByPk(id);
            if(assignment){
                await assignment.destroy();
                res.status(200).send("S-a sters yey");
            }
        }catch(err){
            res.status(500).send(err.message);

        }
    },

};

module.exports=controller;