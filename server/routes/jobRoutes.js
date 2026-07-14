const express = require("express");

const router = express.Router();

const {
  createJob,
  getAllJobs,
} = require("../controllers/jobController");

router.post("/", createJob);
router.get("/", getAllJobs);

module.exports = router;