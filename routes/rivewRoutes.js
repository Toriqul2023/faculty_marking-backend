// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const { addReview, getReviews, addReply } = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

// Add Review
router.post("/:facultyId", auth, addReview);

// Get Reviews
router.get("/:facultyId", auth, getReviews);

// Add Reply
router.post("/reply/:reviewId", auth, addReply);

module.exports = router;
