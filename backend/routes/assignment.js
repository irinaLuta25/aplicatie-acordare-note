const express=require('express');

const router = express.Router();

const assignmentController = require("../controllers").assignmentController;
const auth=require("../middlewares/index");

router.get('/getAllEvaluationsByAssignmentsByUserId/:id',auth.isAuthenticated,assignmentController.getAllEvaluationsByAssignmentsByUserId);
router.get('/getAllAssignmentsByPhases',auth.isAuthenticated,assignmentController.getAllAssignmentsByPhases);
router.get('/getAllAssignmentsByUserId/:id',auth.isAuthenticated,assignmentController.getAllAssignmentsByUserId);
router.get('/getAll',auth.isAuthenticated,assignmentController.getAll);
router.get('/:id',auth.isAuthenticated,assignmentController.getAssignmentById);
router.post('/create',auth.isAuthenticated,assignmentController.addAssignment);
router.put('/update/:id',auth.isAuthenticated,assignmentController.editAssignment);
router.delete('/delete/:id',auth.isAuthenticated,assignmentController.deleteAssignment);


module.exports=router;
