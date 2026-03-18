const Behavior = require("../models/Behavior");
const { predictNextBehavior } = require("../utils/predictBehavior");

exports.getPrediction = async (req, res) => {
  try {
    const logs = await Behavior.find().sort({ createdAt: -1 }).limit(50);

    const prediction = predictNextBehavior(logs);

    res.json(prediction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Prediction Failed" });
  }
};