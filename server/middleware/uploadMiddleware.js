const multer = require("multer");

const upload = multer({
  dest: "uploads/resumes/",
});

module.exports = upload;