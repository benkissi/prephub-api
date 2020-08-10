const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema(
  {
    studentCode: {
      type: String,
      required: true,
      trim: true,
    },
    testId: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
      trim: true,
    },
    total: {
      type: Number,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;
