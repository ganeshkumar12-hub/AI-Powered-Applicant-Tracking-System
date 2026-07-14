const express = require("express");

const router = express.Router();

const {
  applyJob,
  getMyApplications,
} = require("../controllers/applicationController");

const {
  protect,
} = require("../middleware/authMiddleware");

router.post("/", protect, applyJob);

router.get("/my-applications", protect, getMyApplications);

module.exports = router;