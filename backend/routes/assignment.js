const express=require('express');

const router = express.Router();

const assignmentController = require("../controllers").assignmentController;

router.get('/getAll',assignmentController.getAll);
router.get('/:id',assignmentController.getAssignmentById);
router.post('/create',assignmentController.addAssignment);
router.put('/update/:id',assignmentController.editAssignment);
router.delete('/delete/:id',assignmentController.deleteAssignment);


module.exports=router;
