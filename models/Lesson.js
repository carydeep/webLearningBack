const mongoose = require("mongoose")

const contentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Type content is required"],
  },
  value: {
    type: String,
    default: "",
  },
  button: {
    type: Boolean,
  },
  language: {
    type: String,
  },
})

const lessonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 3,
    },
    slug: {
      type: String,
      required: [true, "Chapter is require"],
    },
    courseID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "CourseID is require"],
    },
    chapterID: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "ChapterID is require"],
    },
    content: {
      type: [contentSchema],
      index: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("LessonChapter", lessonSchema)
