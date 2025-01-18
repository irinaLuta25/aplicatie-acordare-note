const express = require('express');
const router = express.Router();

const phaseRouter=require('./phase');
const evaluationRouter = require('./evaluation');
const assignmentRouter = require('./assignment');
const teamRouter=require('./team');
const userRouter=require("./user");
const serviceRouter=require('./service');
const authRouter=require('./auth');

router.use("/phase",phaseRouter);
router.use("/team",teamRouter);
router.use("/evaluation",evaluationRouter);
router.use("/assignment",assignmentRouter);
router.use("/user",userRouter);
router.use("/service",serviceRouter);
router.use("/auth",authRouter);

module.exports=router;