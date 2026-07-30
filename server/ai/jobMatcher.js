const SKILLS = [
  {
    name: "Java",
    aliases: ["java"],
  },
  {
    name: "Spring Boot",
    aliases: ["spring boot"],
  },
  {
    name: "Spring",
    aliases: ["spring"],
  },
  {
    name: "Hibernate",
    aliases: ["hibernate"],
  },
  {
    name: "REST API",
    aliases: ["rest api", "rest apis", "rest-based", "restful"],
  },
  {
    name: "React.js",
    aliases: ["react", "react.js", "reactjs"],
  },
  {
    name: "Node.js",
    aliases: ["node", "node.js", "nodejs"],
  },
  {
    name: "Express.js",
    aliases: ["express", "express.js"],
  },
  {
    name: "JavaScript",
    aliases: ["javascript", "js"],
  },
  {
    name: "TypeScript",
    aliases: ["typescript", "ts"],
  },
  {
    name: "HTML",
    aliases: ["html", "html5"],
  },
  {
    name: "CSS",
    aliases: ["css", "css3"],
  },
  {
    name: "SQL",
    aliases: ["sql"],
  },
  {
    name: "MySQL",
    aliases: ["mysql"],
  },
  {
    name: "MongoDB",
    aliases: ["mongodb"],
  },
  {
    name: "Git",
    aliases: ["git"],
  },
  {
    name: "GitHub",
    aliases: ["github"],
  },
  {
    name: "Docker",
    aliases: ["docker"],
  },
  {
    name: "Kubernetes",
    aliases: ["kubernetes", "k8s"],
  },
  {
    name: "AWS",
    aliases: ["aws", "amazon web services"],
  },
  {
    name: "Firebase",
    aliases: ["firebase"],
  },
  {
    name: "Material UI",
    aliases: ["material ui", "mui"],
  },
  {
    name: "Tailwind CSS",
    aliases: ["tailwind", "tailwind css"],
  },
  {
    name: "OOP",
    aliases: ["oop", "object-oriented programming"],
  },
  {
    name: "Data Structures",
    aliases: ["data structures", "dsa", "data structures and algorithms"],
  },
  {
    name: "Algorithms",
    aliases: ["algorithms"],
  },
  {
    name: "Problem Solving",
    aliases: ["problem solving", "problem-solving"],
  },
];
// Escape special regex characters
const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const containsSkill = (text, aliases) => {
  return aliases.some((alias) => {
    const regex = new RegExp(
      `(^|[^a-zA-Z0-9])${escapeRegex(alias)}([^a-zA-Z0-9]|$)`,
      "i",
    );
    return regex.test(text);
  });
};

const calculateJobMatch = (resumeText, jobDescription) => {
  const resume = resumeText.toLowerCase();
  const jd = jobDescription.toLowerCase();
  // Section Scores
  let experienceScore = 0;
  let projectScore = 0;
  let educationScore = 0;
  let certificationScore = 0;

  const matchedSkills = [];
  const missingSkills = [];

  for (const skill of SKILLS) {
    const jdHasSkill = containsSkill(jd, skill.aliases);

    if (!jdHasSkill) continue;

    const resumeHasSkill = containsSkill(resume, skill.aliases);

    if (resumeHasSkill) {
      matchedSkills.push(skill.name);
    } else {
      missingSkills.push(skill.name);
    }
  }
  // Experience
  if (resume.includes("intern") || resume.includes("experience")) {
    experienceScore = 20;
  }

  // Projects
  const projectKeywords = [
    "project",
    "developed",
    "built",
    "implemented",
    "designed",
  ];

  const projectMatches = projectKeywords.filter((word) =>
    resume.includes(word),
  ).length;

  projectScore = Math.min(15, projectMatches * 3);

  // Education
  if (
    resume.includes("bachelor") ||
    resume.includes("engineering") ||
    resume.includes("cgpa")
  ) {
    educationScore = 10;
  }

  // Certifications
  if (resume.includes("certification") || resume.includes("certifications")) {
    certificationScore = 5;
  }
  const totalSkills = matchedSkills.length + missingSkills.length;

  const skillScore =
    totalSkills === 0 ? 0 : (matchedSkills.length / totalSkills) * 50;

  const matchScore = Math.round(
    skillScore +
      experienceScore +
      projectScore +
      educationScore +
      certificationScore,
  );

  let feedback = "";

  if (matchScore >= 90) {
    feedback =
      "Excellent match! Your resume aligns very closely with the job requirements. Continue emphasizing your project achievements and measurable results.";
  } else if (matchScore >= 75) {
    feedback = `Your resume is a strong match for this role. You already demonstrate experience with ${matchedSkills.join(", ")}. Consider highlighting ${missingSkills.join(", ")} if you have worked with them.`;
  } else if (matchScore >= 50) {
    feedback = `Your resume is a moderate match for this position. Your strengths include ${matchedSkills.join(", ")}. To improve your chances, consider adding projects or experience related to ${missingSkills.join(", ")} if applicable.`;
  } else {
    feedback = `Your resume currently matches only a small portion of the job requirements. Focus on learning and showcasing experience in ${missingSkills.join(", ")} to improve your ATS score.`;
  }

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    suggestions:
      missingSkills.length > 0
        ? [
            `Consider adding these skills if you have experience: ${missingSkills.join(", ")}`,
          ]
        : ["Excellent! Your resume matches the job description very well."],
    feedback,
  };
};

module.exports = calculateJobMatch;
