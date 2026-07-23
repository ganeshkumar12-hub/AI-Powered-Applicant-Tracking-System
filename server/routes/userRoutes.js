const express = require("express");
const router = express.Router();

const { uploadResume } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Upload Resume
router.post(
  "/upload-resume",
  upload.single("resume"),
  protect,
  uploadResume
);

// Test Upload Route
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