const express = require("express");

const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
  getTopCandidates,
  saveRecruiterNotes,
  scheduleInterview,
} = require("../controllers/applicationController");
const {
  protect,
  recruiterOnly,
} = require("../middleware/authMiddleware");

// Applicant Routes
router.post("/", protect, applyJob);
router.get("/my-applications", protect, getMyApplications);

// Recruiter Routes
router.get("/job/:jobId", protect, recruiterOnly, getJobApplicants);
router.get(
  "/top-candidates",
  protect,
  recruiterOnly,
  getTopCandidates
);

router.put(
  "/:id/status",
  protect,
  recruiterOnly,
  updateApplicationStatus
);
router.put(
  "/:id/notes",
  protect,
  recruiterOnly,
  saveRecruiterNotes
);
router.put(
  "/:id/interview",
  protect,
  recruiterOnly,
  scheduleInterview
);

module.exports = router;