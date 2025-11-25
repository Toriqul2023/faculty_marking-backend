// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getProfile } = require("../controllers/userController");
const auth = require("../middlewares/auth");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile
router.get("/me", auth, getProfile);

module.exports = router;
