function calculateDecision(data) {
  let impulseScore = 0;
  let compatibilityScore = 0;

  // TIME LOGIC
  if (data.timeSpent <= 5) {
    impulseScore += 40;
  } else if (data.timeSpent <= 15) {
    impulseScore += 20;
  } else {
    compatibilityScore += 30;
  }

  // SCROLL LOGIC
  if (data.scrollDepth && data.scrollDepth > 60) {
    compatibilityScore += 25;
  } else {
    impulseScore += 10;
  }

  // INTERACTION LOGIC
  if (data.interactions && data.interactions >= 3) {
    compatibilityScore += 20;
  } else {
    impulseScore += 10;
  }

  // COLOR SELECTION
  if (data.colorSelected) {
    compatibilityScore += 15;
  }

  // QUANTITY
  if (data.quantity >= 2) {
    compatibilityScore += 10;
  }

  const decision =
    impulseScore > compatibilityScore
      ? "Impulse Buy"
      : "Thoughtful Buy";

  const insight =
    decision === "Impulse Buy"
      ? "User made a quick decision with limited exploration."
      : "User explored product carefully before purchase.";

  return {
    impulseScore,
    compatibilityScore,
    decision,
    insight,
  };
}

module.exports = { calculateDecision };