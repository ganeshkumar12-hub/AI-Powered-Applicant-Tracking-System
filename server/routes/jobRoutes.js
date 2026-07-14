const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
  getRecruiterJobs,
} = require("../controllers/jobController");

const {
  protect,
  recruiterOnly,
} = require("../middleware/authMiddleware");

// Public Routes
router.get("/", getAllJobs);
router.get("/my-jobs", protect, recruiterOnly, getRecruiterJobs);
router.get("/:id", getJobById);

// Recruiter Routes
router.post("/", protect, recruiterOnly, createJob);
router.put("/:id", protect, recruiterOnly, updateJob);
router.delete("/:id", protect, recruiterOnly, deleteJob);

module.exports = router;