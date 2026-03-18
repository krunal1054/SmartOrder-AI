const Behavior = require("../models/Behavior");
const Decision = require("../models/Decision");
const calculateDecision = require("../utils/aiEngine");

exports.generateDecision = async (req, res) => {
  const { sessionId } = req.body;

  const behaviors = await Behavior.find({ sessionId });

  const result = calculateDecision(behaviors);

  const decision = await Decision.create({
    sessionId,
    impulseScore: result.impulseScore,
    compatibilityScore: result.compatibilityScore,
    suggestion: result.suggestion,
  });

  res.json(decision);
};