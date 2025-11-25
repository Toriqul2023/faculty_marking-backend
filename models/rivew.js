const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  comment: { type: String, required: true },
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  replies: [this] // recursive for reply to reply
});

const ReviewSchema = new mongoose.Schema({
  facultyId: { type: mongoose.Schema.Types.ObjectId, ref: "faculty", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  rating: { type: Number, required: true },
  teachingQuality: Number,
  behavior: Number,
  examDifficulty: Number,
  markingStyle: Number,
  course: String,
  comment: String,
  isAnonymous: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  replies: [ReplySchema]  // nested replies
});

module.exports = mongoose.model("review", ReviewSchema);
