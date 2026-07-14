const express = require("express");

const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getJobApplicants,
} = require("../controllers/applicationController");

const {
  protect,
  recruiterOnly,
} = require("../middleware/authMiddleware");

// Applicant
router.post("/", protect, applyJob);
router.get("/my-applications", protect, getMyApplications);

// Recruiter
router.get(
  "/job/:jobId",
  protect,
  recruiterOnly,
  getJobApplicants
);

module.exports = router;