const express = require('express');
const router = express.Router();

const subjectRouter = require("./subject");
const phaseRouter=require('./phase');
const evaluationRouter = require('./evaluation');
const assignmentRouter = require('./assignment');
const teamRouter=require('./team');
const userRouter=require("./user");

router.use("/phase",phaseRouter);
router.use("/team",teamRouter);
router.use("/subject",subjectRouter);
router.use("/evaluation",evaluationRouter);
router.use("/assignment",assignmentRouter);
router.use("/user",userRouter);

module.exports=router;