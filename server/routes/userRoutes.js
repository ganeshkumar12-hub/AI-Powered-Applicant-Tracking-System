const express = require("express");
const router = express.Router();


const {
  getProfile,
  updateProfile,
  uploadResume,
  analyzeResume,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// ===============================
// Get Profile
// ===============================
router.get("/profile", protect, getProfile);
router.get("/analyze-resume", protect, analyzeResume);
// ===============================
// Update Profile
// ===============================
router.put("/profile", protect, updateProfile);
// router.get("/analyze-resume", protect, analyzeResume);
// ===============================
// Upload Resume
// ===============================
router.post(
  "/upload-resume",
  protect,
  upload.single("resume"),
  uploadResume
);

// ===============================
// Test Upload Route
// ===============================
router.post("/test-upload", upload.single("resume"), (req, res) => {
  console.log("FILE:", req.file);
  console.log("BODY:", req.body);

  res.json({
    success: true,
    file: req.file,
    body: req.body,
  });
});

module.exports = router;