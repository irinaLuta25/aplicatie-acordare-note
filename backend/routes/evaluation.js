const express = require('express');
const router = express.Router();

const evaluationController = require("../controllers").evaluationController;
const auth=require("../middlewares/index");


router.get('/getAll',auth.isAuthenticated, evaluationController.getAll);
router.get('/:id',auth.isAuthenticated, evaluationController.getEvaluationBydId);
router.get('/getAllStudentsByPhaseId/:phaseId',auth.isAuthenticated, evaluationController.getAllStudentsByPhaseId);
router.get('/getJuryStatusByPhaseId/:phaseId',auth.isAuthenticated, evaluationController.getJuryStatusByPhaseId);
router.get('/getAllTeachersByPhaseId/:phaseId',auth.isAuthenticated, evaluationController.getAllTeachersByPhaseId);
router.post('/create',auth.isAuthenticated, evaluationController.addEvaluation);
router.put('/update/:id',auth.isAuthenticated, evaluationController.editEvaluation);
router.delete('/delete/:id',auth.isAuthenticated, evaluationController.deleteEvaluation);

module.exports = router;
