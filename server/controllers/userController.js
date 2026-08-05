const User = require("../models/User");
const fs = require("fs");
const PDFParser = require("pdf2json");
const calculateATSScore = require("../ai/atsScore");
const calculateJobMatch = require("../ai/jobMatcher");

// ===============================
// Get Profile
// ===============================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Update Profile
// ===============================
const updateProfile = async (req, res) => {
  try {
    const { name, phone, location, about, education, experience, skills } =
      req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.name = name ?? user.name;
    user.phone = phone ?? user.phone;
    user.location = location ?? user.location;
    user.about = about ?? user.about;
    user.education = education ?? user.education;
    user.experience = experience ?? user.experience;

    if (skills) {
      user.skills = Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill) => skill.trim());
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Upload Resume
// ===============================
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.resume = req.file.path;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// Analyze Resume ATS Score
// ===============================
const analyzeResume = async (req, res) => {
  console.log("========== Analyze Resume API Called ==========");

  try {
    const user = await User.findById(req.user.id);
    console.log("========== USER ==========");
    console.log(user);

    if (!user || !user.resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // Check file exists
    if (!fs.existsSync(user.resume)) {
      return res.status(404).json({
        success: false,
        message: "Resume file not found on server",
      });
    }

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
      return res.status(500).json({
        success: false,
        message: errData.parserError,
      });
    });

    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      console.log("========== PDF Parsed Successfully ==========");

      try {
        let text = "";

        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((textItem) => {
            textItem.R.forEach((r) => {
              try {
                text += decodeURIComponent(r.T) + " ";
              } catch (err) {
                text += r.T + " ";
              }
            });
          });
        });

        const result = calculateATSScore(text);

        console.log("========== ATS RESULT ==========");
        console.log(result);

        // Save latest ATS result
        user.atsScore = result.score;
        user.matchedSkills = result.matchedSkills;
        user.atsSuggestions = result.suggestions;

        await user.save();

        console.log("========== USER AFTER SAVE ==========");
        console.log("ATS:", user.atsScore);
        console.log("Skills:", user.matchedSkills);

        return res.status(200).json({
          success: true,
          score: result.score,
          matchedSkills: result.matchedSkills,
          suggestions: result.suggestions,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });

    console.log("Loading PDF:", user.resume);

    pdfParser.loadPDF(user.resume);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// Job Description Match
// ===============================
const jobMatch = async (req, res) => {
  try {
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description is required",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user || !user.resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (errData) => {
      return res.status(500).json({
        success: false,
        message: errData.parserError,
      });
    });

    pdfParser.on("pdfParser_dataReady", async (pdfData) => {
      try {
        let resumeText = "";

        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((textItem) => {
            textItem.R.forEach((r) => {
              try {
                resumeText += decodeURIComponent(r.T) + " ";
              } catch {
                resumeText += r.T + " ";
              }
            });
          });
        });

        const result = calculateJobMatch(resumeText, jobDescription);

        return res.status(200).json({
          success: true,
          ...result,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });

    pdfParser.loadPDF(user.resume);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
  analyzeResume,
  jobMatch,
};
