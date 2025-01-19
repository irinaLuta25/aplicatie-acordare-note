const express=require('express');
const router=express.Router();

const userController=require("../controllers").userController;
const auth=require("../middlewares/index");


router.get('/getAll',userController.getAll);
router.get('/:id',auth.isAuthenticated,userController.getUserById);
router.post('/create',userController.addUser);
router.put('/update/:id',auth.isAuthenticated,userController.editUser);
router.delete('/delete/:id',auth.isAuthenticated,userController.deleteUser);

module.exports =router;
