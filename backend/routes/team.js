const express=require("express");

const router=express.Router();

const teamController=require("../controllers").teamController;
const auth=require("../middlewares/index");


router.get("/getAll",auth.isAuthenticated,teamController.getAll);
router.get("/:id",auth.isAuthenticated,teamController.getTeamById);
router.get('/getAllTeamsByPhaseId/:phaseId',auth.isAuthenticated, teamController.getAllTeamsByPhaseId);
router.get('/getAllTeamsByPhaseIdByUser/:phaseId',auth.isAuthenticated, teamController.getAllTeamsByPhaseIdByUser);
router.post("/create",auth.isAuthenticated,teamController.addTeam);
router.put("/update/:id",auth.isAuthenticated,teamController.editTeam);
router.delete("/delete/:id",auth.isAuthenticated,teamController.deleteTeam);
router.get("/getTeamStatus/:id",auth.isAuthenticated,teamController.getTeamStatus);

module.exports=router;