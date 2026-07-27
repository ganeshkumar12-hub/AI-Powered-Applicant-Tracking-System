const requiredSkills = [
  "java",
  "python",
  "javascript",
  "react",
  "node",
  "express",
  "mongodb",
  "mysql",
  "sql",
  "html",
  "css",
  "git",
  "github",
  "spring",
  "spring boot",
  "aws",
];

const calculateATSScore = (resumeText) => {
  const suggestions = [];
  const text = resumeText.toLowerCase();

  let matchedSkills = [];

  requiredSkills.forEach((skill) => {
    if (text.includes(skill)) {
      matchedSkills.push(skill);
    }
  });

  const score = Math.round(
    (matchedSkills.length / requiredSkills.length) * 100
  );

  if (!text.includes("github")) {
    suggestions.push("Add your GitHub profile.");
  }

  if (!text.includes("linkedin")) {
    suggestions.push("Add your LinkedIn profile.");
  }

  if (!text.includes("project")) {
    suggestions.push("Mention your projects.");
  }

  if (!text.includes("certification")) {
    suggestions.push("Include certifications.");
  }

  return {
    score,
    matchedSkills,
    suggestions,
  };
};

module.exports = calculateATSScore;