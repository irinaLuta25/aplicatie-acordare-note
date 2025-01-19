const express=require("express");

const router=express.Router();

const phaseController=require("../controllers").phaseController;
const auth=require("../middlewares/index");


router.get('/getAll',auth.isAuthenticated,phaseController.getAll);
router.get('/:id',auth.isAuthenticated,phaseController.getPhaseById);
router.post('/create',auth.isAuthenticated,phaseController.addPhase);
router.put('/update/:id',auth.isAuthenticated,phaseController.editPhase);
router.delete('/delete/:id',auth.isAuthenticated,phaseController.deletePhase);

module.exports=router;

