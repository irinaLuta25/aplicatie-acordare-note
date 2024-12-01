const express = require('express');
const router = express.Router();

const subjectController= require("../controllers").subjectController;

router.get("/getAll",subjectController.getAll);
router.get("/:id",subjectController.getSubjectById);
router.post("/create",subjectController.addSubject);
router.put("/update/:id",subjectController.editSubject);
router.delete("/delete/:id",subjectController.deleteSubject);

module.exports=router;