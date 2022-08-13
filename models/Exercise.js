const mongoose = require("mongoose")

const exerciseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    coCreator: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "QuestionExercise",
      },
    ],
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Exercise", exerciseSchema)
