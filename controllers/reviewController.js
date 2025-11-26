const Review = require("../models/rivew");
const Faculty = require("../models/faculty");

// Add Review
exports.addReview = async (req, res) => {
  try {
    const { rating, course, comment, isAnonymous } = req.body;

    const review = await Review.create({
      facultyId: req.params.facultyId,
      userId: req.user.id,
      rating,
      course,
      comment,
      isAnonymous,
    });

    // Update Faculty avgRating & totalReviews
    const reviews = await Review.find({ facultyId: req.params.facultyId });
    const avg = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await Faculty.findByIdAndUpdate(req.params.facultyId, {
      avgRating: avg,
      totalReviews: reviews.length,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Reviews for a faculty
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ facultyId: req.params.facultyId }).populate(
      "userId",
      "name"
    );
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add Reply (Nested)
exports.addReply = async (req, res) => {
  try {
    const { parentReplyId, comment, isAnonymous } = req.body;

    const review = await Review.findById(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    const newReply = {
      userId: req.user.id,
      comment,
      isAnonymous,
      createdAt: new Date(),
      replies: [],
    };

    // Insert reply
    if (!parentReplyId) {
      review.replies.push(newReply);
    } else {
      const addNestedReply = (replies) => {
        for (let r of replies) {
          if (r._id.toString() === parentReplyId) {
            r.replies.push(newReply);
            return true;
          } else if (r.replies.length > 0) {
            if (addNestedReply(r.replies)) return true;
          }
        }
        return false;
      };
      addNestedReply(review.replies);
    }

    await review.save();

    // populate user name for UI
    const populatedReview = await Review.findById(review._id)
      .populate("replies.userId", "name");

    // get last inserted reply
    let insertedReply;
    if (!parentReplyId) {
      insertedReply = populatedReview.replies.slice(-1)[0];
    } else {
      const findInserted = (replies) => {
        for (let r of replies) {
          if (r.comment === comment && r.userId._id.toString() === req.user.id) {
            return r;
          }
          if (r.replies.length > 0) {
            const found = findInserted(r.replies);
            if (found) return found;
          }
        }
        return null;
      };
      insertedReply = findInserted(populatedReview.replies);
    }

    res.status(201).json(insertedReply);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
