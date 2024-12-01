const express=require("express");

const router=express.Router();

const teamController=require("../controllers").teamController;

router.get("/getAll",teamController.getAll);
router.get("/:id",teamController.getTeamById);
router.post("/create",teamController.addTeam);
router.put("/update/:id",teamController.editTeam);
router.delete("/delete/:id",teamController.deleteTeam);

module.exports=router;