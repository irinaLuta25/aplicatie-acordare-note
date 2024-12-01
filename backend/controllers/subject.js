const SubjectDb = require("../models").Subject;

const controller = {
    addSubject: async(req,res) => {
        const subject = {
            name: req.body.name
        };
        console.log(subject);

        try {
            const newSubject = await SubjectDb.create(subject);
            res.status(200).send(newSubject);
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    getAll: async(req,res) => {
        try {
            const subjects = await SubjectDb.findAll();
            res.status(200).send(subjects);
        } catch(err) {
            res.status(500).send(err.message);
        }
    },

    getSubjectById: async(req,res) => {
        const id=req.params.id;
        try{
            const subject=await SubjectDb.findByPk(id);
            res.status(200).send(subject);
        }catch(err){
            res.status(500).send(err.message);
        }

    },

    editSubject: async(req,res) => {
        const id = req.params.id;
        const updatedSubject = {
            name:req.body.name
        };
        try{
            const subject = await SubjectDb.findByPk(id);
            if(subject){
                await subject.update(updatedSubject);
                res.status(200).send(subject);
            }
        }catch(err){
            res.status(500).send(err.message);
        }
    },

    deleteSubject: async(req,res) => {
        const id =req.params.id;
        try{
            const subject = await SubjectDb.findByPk(id);
            if(subject){
                await subject.destroy();
                res.status(200).send("S-a sters yeyyeye");
            }
        }catch(err){
            res.status(500).send(err.message);
        }
    },
}
module.exports=controller;