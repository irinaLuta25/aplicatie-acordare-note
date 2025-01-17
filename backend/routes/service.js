const express = require("express");
const router = express.Router();

const serviceController = require("../controllers").serviceController;

router.post('/createEvaluationStudent', serviceController.createEvaluationStudent);
router.post('/createEvaluationJury', serviceController.createEvaluationJury);

module.exports = router;
