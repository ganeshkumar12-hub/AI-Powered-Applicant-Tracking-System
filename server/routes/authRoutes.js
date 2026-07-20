const express = require("express");

const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
const User = require("../models/User");

router.get("/all-users", async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});
module.exports = router;