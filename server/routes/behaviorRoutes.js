const express = require("express");
const router = express.Router();

const behaviorController = require("../controllers/behaviorController");

// POST → Save behavior
router.post("/save", behaviorController.saveBehavior);

// GET → Fetch logs
router.get("/logs", behaviorController.getAllBehavior);

module.exports = router;