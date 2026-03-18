const mongoose = require("mongoose");

const decisionSchema = new mongoose.Schema({
  sessionId: String,
  impulseScore: Number,
  compatibilityScore: Number,
  suggestion: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Decision", decisionSchema);