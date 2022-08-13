const mongoose = require("mongoose")

const question = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  exerciseId: {
    type: String,
    required: [true, "Need exercise id"],
    ref: "Exercise",
  },
  genus: {
    type: String,
  },
  options: [
    {
      explain: String,
      isRight: Boolean,
      statement: String,
    },
  ],
})

module.exports = mongoose.model("QuestionExercise", question)
