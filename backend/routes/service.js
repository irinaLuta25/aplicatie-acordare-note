const express = require("express");
const router = express.Router();

const serviceController = require("../controllers").serviceController;
const auth=require("../middlewares/index");


router.post('/createEvaluationStudent/:phaseId/:phaseIdForTeam',auth.isAuthenticated, serviceController.createEvaluationStudent);
router.post('/createEvaluationJury/:phaseId',auth.isAuthenticated, serviceController.createEvaluationJury);
router.get('/calculateGrades/:phaseId',auth.isAuthenticated, serviceController.calculateGrades);
router.get('/visualizeGradesByTeachers/:phaseId/:phaseIdForWatching',auth.isAuthenticated, serviceController.visualizeGradesByTeachers);

module.exports = router;
