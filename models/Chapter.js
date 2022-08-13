const mongoose = require("mongoose")

const chapterSchema = new mongoose.Schema(
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
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LessonChapter",
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("ChapterCourse", chapterSchema)
