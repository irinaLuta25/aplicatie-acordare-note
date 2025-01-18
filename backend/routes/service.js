const express = require("express");
const router = express.Router();

const serviceController = require("../controllers").serviceController;

router.post('/createEvaluationStudent/:phaseId/:phaseIdForTeam', serviceController.createEvaluationStudent);
router.post('/createEvaluationJury/:phaseId', serviceController.createEvaluationJury);
router.get('/calculateGrades/:phaseId', serviceController.calculateGrades);
router.get('/visualizeGradesByTeachers/:phaseId/:phaseIdForWatching', serviceController.visualizeGradesByTeachers);

module.exports = router;
