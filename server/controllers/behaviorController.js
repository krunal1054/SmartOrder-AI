const Behavior = require("../models/Behavior");
const { calculateDecision } = require("../utils/aiScoring");

// ==============================
// SAVE USER BEHAVIOR
// ==============================
exports.saveBehavior = async (req, res) => {
  try {
    const {
      sessionId,
      productName,
      colorSelected,
      sizeSelected,
      quantity,
      timeSpent,
      scrollDepth = 0,
      interactions = 0,
      action,
    } = req.body;

    // ✅ Run AI scoring
    const ai = calculateDecision({
      colorSelected,
      sizeSelected,
      quantity,
      timeSpent,
    });

    const newBehavior = new Behavior({
      sessionId,
      productName,
      colorSelected,
      sizeSelected,
      quantity,
      timeSpent,
      scrollDepth,
      interactions,
      action,

      impulseScore: ai.impulseScore,
      compatibilityScore: ai.compatibilityScore,
      finalScore: ai.finalScore,
      decisionTag: ai.decisionTag,
      insight: ai.insight,
    });

    await newBehavior.save();

    res.status(201).json(newBehavior);
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: "Save Failed" });
  }
};

// ==============================
// GET ALL BEHAVIOR LOGS
// ==============================
exports.getAllBehavior = async (req, res) => {
  try {
    const logs = await Behavior.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    console.error("FETCH ERROR:", err);
    res.status(500).json({ error: "Fetch Failed" });
  }
};