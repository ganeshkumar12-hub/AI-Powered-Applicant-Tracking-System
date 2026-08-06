const generateCandidateSummary = (
  atsScore,
  matchedSkills,
  missingSkills
) => {
  let recommendation = "";
  let hiringDecision = "";

  if (atsScore >= 80) {
  recommendation = "Strong Candidate";
  hiringDecision = "Recommended for Technical Interview";
} else if (atsScore >= 60) {
  recommendation = "Moderate Candidate";
  hiringDecision = "Recommended for HR Screening";
} else {
  recommendation = "Needs Improvement";
  hiringDecision = "Not Recommended";
}

  return `
Candidate Recommendation: ${recommendation}.

ATS Score: ${atsScore}%.

Strong skills: ${
    matchedSkills.length
      ? matchedSkills.join(", ")
      : "None"
  }.

Missing skills: ${
    missingSkills.length
      ? missingSkills.join(", ")
      : "None"
  }.

Overall, this candidate is suitable for further evaluation based on the current resume analysis.
Hiring Decision: ${hiringDecision}
`;
};

module.exports = generateCandidateSummary;