const Review = require("../models/rivew").Review;
const Reply = require("../models/rivew").Reply;
const Faculty = require("../models/faculty");

// ---------------------- Add Review ----------------------
exports.addReview = async (req, res) => {
  try {
    const { rating, course, comment, isAnonymous } = req.body;

    // 1. Create review
    const review = await Review.create({
      facultyId: req.params.facultyId,
      userId: req.user.id,
      rating,
      course,
      comment,
      isAnonymous
    });

    // 2. Update faculty avgRating & totalReviews
    const reviews = await Review.find({ facultyId: req.params.facultyId });
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Faculty.findByIdAndUpdate(req.params.facultyId, {
      avgRating: avg,
      totalReviews: reviews.length
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- Get Reviews ----------------------
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ facultyId: req.params.facultyId }).populate("userId", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- Add Reply ----------------------
exports.addReply = async (req, res) => {
  try {
    const { comment, isAnonymous, parentReviewId, parentReplyId } = req.body;

    // parentReviewId অথবা parentReplyId validation
    if (!parentReviewId && !parentReplyId) {
      return res.status(400).json({ message: "parentReviewId or parentReplyId required" });
    }

    const reply = await Reply.create({
      facultyId: req.params.facultyId,
      userId: req.user.id,
      comment,
      isAnonymous,
      parentReviewId: parentReviewId || null,
      parentReplyId: parentReplyId || null
    });
 console.log(reply);
    res.status(201).json(reply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ---------------------- Get Replies ----------------------
exports.getReplies = async (req, res) => {
  try {
    const replies = await Reply.find({ facultyId: req.params.facultyId }).populate("userId", "name");
    res.json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};