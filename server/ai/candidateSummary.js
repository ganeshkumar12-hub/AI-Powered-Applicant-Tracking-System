const generateCandidateSummary = (
  atsScore,
  matchedSkills,
  missingSkills
) => {
  let recommendation = "";

  if (atsScore >= 80) {
    recommendation = "Strong Candidate";
  } else if (atsScore >= 60) {
    recommendation = "Moderate Candidate";
  } else {
    recommendation = "Needs Improvement";
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
`;
};

module.exports = generateCandidateSummary;