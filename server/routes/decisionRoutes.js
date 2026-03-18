const express = require("express");
const router = express.Router();
const { generateDecision } = require("../controllers/decisionController");

router.post("/", generateDecision);

module.exports = router;