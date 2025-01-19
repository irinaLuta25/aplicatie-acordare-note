const express=require('express');

const router = express.Router();

const assignmentController = require("../controllers").assignmentController;
const auth=require("../middlewares/index");

router.get('/getAll',auth.isAuthenticated,assignmentController.getAll);
router.get('/:id',auth.isAuthenticated,assignmentController.getAssignmentById);
router.post('/create',auth.isAuthenticated,assignmentController.addAssignment);
router.put('/update/:id',auth.isAuthenticated,assignmentController.editAssignment);
router.delete('/delete/:id',auth.isAuthenticated,assignmentController.deleteAssignment);


module.exports=router;
