function calculateDecision(data) {
  let impulseScore = 0;
  let compatibilityScore = 0;

  // TIME ANALYSIS
  if (data.timeSpent > 25) impulseScore += 20;
  else if (data.timeSpent > 10) impulseScore += 10;
  else impulseScore += 40; // fast = impulsive

  // SELECTION CONFIDENCE
  if (data.colorSelected && data.sizeSelected) compatibilityScore += 20;

  // QUANTITY SIGNAL
  if (data.quantity >= 2) compatibilityScore += 10;

  // FINAL SCORE (Simple UI-friendly score)
  const finalScore = compatibilityScore + (50 - impulseScore);

  // DECISION TAG (easy for frontend)
  const decisionTag =
    finalScore >= 40 ? "Rational Purchase" : "Impulse Purchase";

  const insight =
    decisionTag === "Impulse Purchase"
      ? "User decided quickly with low evaluation."
      : "User explored and made a considered choice.";

  return {
    impulseScore,
    compatibilityScore,
    finalScore,
    decisionTag,
    insight,
  };
}

module.exports = { calculateDecision };