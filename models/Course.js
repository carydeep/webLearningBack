const mongoose = require("mongoose")

const course = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is require"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    slug: {
      type: String,
      require: [true, "Slug is require"],
      unique: true,
    },
    icon: {
      type: String,
      required: [true, "Icon is require"],
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      require: [true, "Group is require"],
      ref: "GroupCourse",
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TopicCourse",
      },
    ],
    chapters: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChapterCourse",
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

module.exports = mongoose.model("Courses", course)
