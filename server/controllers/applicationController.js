const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");
const generateCandidateSummary = require("../ai/candidateSummary");
const applyJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    // Check whether job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check duplicate application
    const alreadyApplied = await Application.findOne({
      applicant: req.user._id,
      job: jobId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const applicant = await User.findById(req.user._id);

console.log("========== APPLICANT DATA ==========");
console.log("ATS Score:", applicant.atsScore);
console.log("Matched Skills:", applicant.matchedSkills);
console.log("===================================");

const recommendation =
  applicant.atsScore >= 80
    ? "Strong Candidate"
    : applicant.atsScore >= 60
    ? "Moderate Candidate"
    : "Needs Improvement";

const strengths = applicant.matchedSkills;

const weaknesses = applicant.missingSkills || [];

const aiSummary = generateCandidateSummary(
  applicant.atsScore,
  strengths,
  weaknesses
);

const application = await Application.create({
  applicant: req.user.id,
  job: jobId,
  resume: applicant.resume,
  coverLetter: coverLetter || "",
  atsScore: applicant.atsScore,
  matchedSkills: applicant.matchedSkills,

  aiSummary,
  recommendation,
  strengths,
  weaknesses,
});

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      applicant: req.user._id,
    })
      .populate("job", "title company location employmentType salary")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getJobApplicants = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate(
  "applicant",
  "name email resume atsScore matchedSkills"
)
.populate("job", "title company location");

// Sort by ATS Score (Highest First)
applications.sort(
  (a, b) =>
    (b.applicant?.atsScore || 0) -
    (a.applicant?.atsScore || 0)
);
    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ===============================
// Top Candidates
// ===============================
const getTopCandidates = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate(
        "applicant",
        "name email resume atsScore matchedSkills"
      )
      .populate("job", "title company");

    applications.sort(
      (a, b) =>
        (b.applicant?.atsScore || 0) -
        (a.applicant?.atsScore || 0)
    );

    const topCandidates = applications.slice(0, 5);

    res.status(200).json({
      success: true,
      candidates: topCandidates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};  
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );


    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      application,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const saveRecruiterNotes = async (req, res) => {
  try {
    const { notes } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.recruiterNotes = notes;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Recruiter notes saved successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const scheduleInterview = async (req, res) => {
  try {
    const {
      interviewDate,
      interviewTime,
      interviewMode,
      meetingLink,
    } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.interviewDate = interviewDate;
    application.interviewTime = interviewTime;
    application.interviewMode = interviewMode;
    application.meetingLink = meetingLink;

    // Automatically update status
    application.status = "Interview";

    await application.save();

    res.status(200).json({
      success: true,
      message: "Interview scheduled successfully",
      application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  applyJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
  getTopCandidates,
  saveRecruiterNotes,
  scheduleInterview,
};
