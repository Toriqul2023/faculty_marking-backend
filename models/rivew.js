const mongoose = require("mongoose");



const ReviewSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "faculty", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  rating: { type: Number},
  comment: String,
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  
});
const replySchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "faculty", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  comment: String,  
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  parentReviewId: { type: mongoose.Schema.Types.ObjectId, ref: "review", required: true }, // original review
  parentReplyId: { type: mongoose.Schema.Types.ObjectId, ref: "reply", default: null }, 

  comment: String,    
});

module.exports = {
  Review: mongoose.model("review", ReviewSchema),
  Reply: mongoose.model("reply", replySchema)
}
