const User = require("../models/User");

const uploadResume = async (req, res) => {
  console.log("========== DEBUG ==========");
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("File:", req.file);
  console.log("===========================");

  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume",
      });
    }

    const user = await User.findById(req.user.id);

    user.resume = req.file.path;

    await user.save();

    res.status(200).json({
      message: "Resume uploaded successfully",
      resume: user.resume,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  uploadResume,
};