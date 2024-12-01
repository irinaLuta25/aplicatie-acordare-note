const PhaseDb=require("../models").Phase;

const controller={
    addPhase:async (req,res)=>{
        const phase={
            name: req.body.name,
            deadline: req.body.deadline,
            description:req.body.description,
            receiveGrade:req.body.receiveGrade,
            idAssignment:req.body.idAssignment
        };
        try{
            const newPhase= await PhaseDb.create(phase);
            res.status(200).send(newPhase);
        }catch(err){
            res.status(500).send(err.message);
        }
    },
    getAll: async(req,res)=>{
        try{
            const phases=await PhaseDb.findAll();
            res.status(200).send(phases);

        } catch(err){
            res.status(500).send(err.message);
        }
    },
    getPhaseById: async(req,res)=>{
        const id=req.params.id;
        try{
            const phase=await PhaseDb.findByPk(id);
            res.status(200).send(phase);
        }catch(err){
            res.status(500).send(err.message);
        }
    },
    editPhase:async(req,res)=>{
        const id=req.params.id;
        const updatedPhase={
            name: req.body.name,
            deadline: req.body.deadline,
            description:req.body.description,
            receiveGrade:req.body.receiveGrade
        };
        try{
            const phase=await PhaseDb.findByPk(id);
            if(phase){
                await phase.update(updatedPhase);
                res.status(200).send(phase);
            }

        }catch(err){
            res.status(500).send(err.message);
        }
    },
    deletePhase: async (req,res)=>{
        const id=req.params.id;
        try{
            const phase=await PhaseDb.findByPk(id);
            if(phase){
                await phase.delete();
                res.status(200).send("S-a sters yeyeye");
            }
        }catch(err){
            res.status(500).send(err.message);

        }
    }
}
module.exports=controller;