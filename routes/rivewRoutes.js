const express = require("express");
const router = express.Router();
const {
  addReview,
  getReviews,
  addReply,
  getReplies
} = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

// ---------------- Add Review ----------------
router.post("/:facultyId", auth, addReview);

// ---------------- Get Reviews ----------------
router.get("/:facultyId", auth, getReviews);

// ---------------- Get Replies (all) ----------------
router.get("/replies/:facultyId", auth, getReplies);

// ---------------- Add Reply ----------------
router.post("/reply/:facultyId", auth, addReply);

module.exports = router;