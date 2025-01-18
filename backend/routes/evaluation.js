const express = require('express');
const router = express.Router();

const evaluationController = require("../controllers").evaluationController;

router.get('/getAll', evaluationController.getAll);
router.get('/:id', evaluationController.getEvaluationBydId);
router.get('/getAllStudentsByPhaseId/:phaseId', evaluationController.getAllStudentsByPhaseId);
router.get('/getAllTeachersByPhaseId/:phaseId', evaluationController.getAllTeachersByPhaseId);
router.post('/create', evaluationController.addEvaluation);
router.put('/update/:id', evaluationController.editEvaluation);
router.delete('/delete/:id', evaluationController.deleteEvaluation);

module.exports = router;
