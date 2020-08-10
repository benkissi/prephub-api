const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
    },
    teacherCode: {
      type: String,
      required: true,
      trim: true,
    },
    takers: {
      type: Number,
      default: 0,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);


const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
