const express = require('express');
const router = express.Router();

const userAssignmentController = require("../controllers").userAssignmentController;

router.get('/getAll',userAssignmentController.getAll);
router.get('/getAllStudents',userAssignmentController.getAllStudents);

router.get('/:id',userAssignmentController.getUserAssignmentBydId);
router.post('/create',userAssignmentController.addUserAssignment);
router.put('/update/:id',userAssignmentController.editUserAssignment);
router.delete('/delete/:id',userAssignmentController.deleteUserAssignment);

module.exports =router;
