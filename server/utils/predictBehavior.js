function predictNextBehavior(logs) {
  if (!logs || logs.length === 0) {
    return {
      prediction: "No Data",
      confidence: 0,
      recommendation: "Collect more sessions",
    };
  }

  const impulse = logs.filter(l => l.decisionTag === "Impulse Purchase").length;
  const rational = logs.filter(l => l.decisionTag === "Rational Purchase").length;

  const total = logs.length;

  const impulseRatio = impulse / total;
  const rationalRatio = rational / total;

  if (impulseRatio > 0.4) {
    return {
      prediction: "Users Likely To Buy Impulsively",
      confidence: (impulseRatio * 100).toFixed(1),
      recommendation: "Show Comparison Popup or Delay Checkout",
    };
  }

  if (rationalRatio > 0.2) {
    return {
      prediction: "Users Are Evaluating Carefully",
      confidence: (rationalRatio * 100).toFixed(1),
      recommendation: "Highlight Product Benefits",
    };
  }

  return {
    prediction: "Mixed Behavior",
    confidence: 50,
    recommendation: "Provide Balanced UX",
  };
}

module.exports = { predictNextBehavior };