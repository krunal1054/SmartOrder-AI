const Behavior = require("../models/Behavior");

exports.getDashboardStats = async (req, res) => {
  try {
    const logs = await Behavior.find();

    const totalSessions = logs.length;

    let impulseCount = 0;
    let thoughtfulCount = 0;
    let totalImpulseScore = 0;
    let totalCompatibilityScore = 0;
    let totalTime = 0;

    const productStats = {};

    logs.forEach((log) => {
      totalImpulseScore += log.impulseScore || 0;
      totalCompatibilityScore += log.compatibilityScore || 0;
      totalTime += log.timeSpent || 0;

      if (log.aiDecision === "Impulse Buy") impulseCount++;
      else thoughtfulCount++;

      // Product-wise tracking
      if (!productStats[log.productName]) {
        productStats[log.productName] = {
          views: 0,
          impulse: 0,
          thoughtful: 0,
        };
      }

      productStats[log.productName].views++;

      if (log.aiDecision === "Impulse Buy")
        productStats[log.productName].impulse++;
      else productStats[log.productName].thoughtful++;
    });

    const avgImpulseScore =
      totalSessions > 0 ? totalImpulseScore / totalSessions : 0;

    const avgCompatibilityScore =
      totalSessions > 0 ? totalCompatibilityScore / totalSessions : 0;

    const avgTime =
      totalSessions > 0 ? totalTime / totalSessions : 0;

    res.json({
      totalSessions,
      impulseCount,
      thoughtfulCount,
      avgImpulseScore: avgImpulseScore.toFixed(1),
      avgCompatibilityScore: avgCompatibilityScore.toFixed(1),
      avgTime: avgTime.toFixed(1),
      productStats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Analytics error" });
  }
};