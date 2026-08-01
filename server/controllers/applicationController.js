const Application = require("../models/Application");
const Job = require("../models/Job");
const User = require("../models/User");

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

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

const application = await Application.create({
  applicant: req.user._id,
  job: jobId,
  atsScore: applicant?.atsScore || 0,
  matchedSkills: applicant?.matchedSkills || [],
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
module.exports = {
  applyJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
};
