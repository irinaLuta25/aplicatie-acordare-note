const express=require('express');
const router=express.Router();

const userController=require("../controllers").userController;

router.get('/getAll',userController.getAll);
router.get('/:id',userController.getUserById);
router.post('/create',userController.addUser);
router.put('/update/:id',userController.editUser);
router.delete('/delete/:id',userController.deleteUser);

module.exports =router;
