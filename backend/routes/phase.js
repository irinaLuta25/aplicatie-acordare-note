const express=require("express");

const router=express.Router();

const phaseController=require("../controllers").phaseController;

router.get('/getAll',phaseController.getAll);
router.get('/:id',phaseController.getPhaseById);
router.post('/create',phaseController.addPhase);
router.put('/update/:id',phaseController.editPhase);
router.delete('/delete/:id',phaseController.deletePhase);

module.exports=router;

