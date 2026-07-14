const express = require("express");

const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getJobApplicants,
  updateApplicationStatus,
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

router.put(
  "/:id/status",
  protect,
  recruiterOnly,
  updateApplicationStatus
);

module.exports = router;