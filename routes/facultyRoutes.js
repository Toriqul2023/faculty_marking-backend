// routes/facultyRoutes.js
const express = require("express");
const router = express.Router();
const { addFaculty, getAllFaculty, getFaculty } = require("../controllers/facultyController");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// Add Faculty → Admin only
router.post("/",  addFaculty);

// Get All → any logged-in user
router.get("/", auth, getAllFaculty);

// Get Single → any logged-in user
router.get("/:id", auth, getFaculty);

module.exports = router;
