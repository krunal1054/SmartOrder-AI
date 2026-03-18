const mongoose = require("mongoose");

const behaviorSchema = new mongoose.Schema(
  {
    sessionId: String,
    productName: String,
    colorSelected: String,
    sizeSelected: String,
    quantity: Number,
    timeSpent: Number,
    scrollDepth: Number,
    interactions: Number,
    action: String,

    impulseScore: Number,
    compatibilityScore: Number,

    // ✅ NEW UI FRIENDLY FIELD
    finalScore: Number,
    decisionTag: String,
    insight: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Behavior", behaviorSchema);