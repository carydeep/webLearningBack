const { removeVietnameseTones, deleteCache } = require("../commonFunction")
const LessonChapter = require("../models/Lesson")
const ChapterCourse = require("../models/Chapter")
const Course = require("../models/Course")

const lessonController = {
  addLesson: async (req, res) => {
    try {
      const { idcourse, idchapter } = req.params
      const { name } = req.body
      if (!name) return res.status.json("Name is required")
      const slug = removeVietnameseTones(name)
      const isLessonExist = await LessonChapter.findOne({
        slug,
        courseID: idcourse,
        chapterID: idchapter,
      })
      if (isLessonExist) return res.status(400).json("Lesson already exist")
      const newLesson = new LessonChapter({
        name,
        slug,
        courseID: idcourse,
        chapterID: idchapter,
      })
      const lesson = await newLesson
        .save()
        .then((result) => result)
        .catch((err) => {
          return res.status(400).json(err.message)
        })
      await ChapterCourse.findOneAndUpdate(
        { courseID: idcourse, _id: idchapter },
        { $push: { lessons: lesson._id } },
        { new: true }
      )
        .select("name slug lessons")
        .populate("lessons", "name slug content")
        .then(async (result) => {
          await deleteCache("courses")
          return res.status(201).json(result)
        })
        .catch((err) => {
          return res.status(400).json(err.message)
        })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  updateLesson: async (req, res) => {
    const { name } = req.body
    const { idchapter, idcourse, idlesson } = req.params
    await LessonChapter.findOneAndUpdate(
      { courseID: idcourse, chapterID: idchapter, _id: idlesson },
      { name },
      { new: true }
    )
      .select("name slug")
      .then(async (result) => {
        await deleteCache("courses")
        return res.status(200).json(result)
      })
      .catch((err) => {
        return res.status(400).json(err.message)
      })
  },
  deleteLesson: async (req, res) => {
    try {
      const { idcourse, idchapter, idlesson } = req.params
      const deleteLesson = await LessonChapter.findOneAndDelete({
        _id: idlesson,
        courseID: idcourse,
        chapterID: idchapter,
      })
        .then((result) => result)
        .catch((err) => {
          return res.status(400).json(err.message)
        })
      await ChapterCourse.findOneAndUpdate(
        { _id: idchapter, courseID: idcourse },
        { $pull: { lessons: deleteLesson.__id } },
        { new: true }
      )
        .select("name slug lessons")
        .populate("lessons", "name slug content")
        .then(async (result) => {
          await deleteCache("courses")
          return res.status(200).json(result)
        })
        .catch((err) => {
          return res.status(400).json(err.message)
        })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  addContent: async (req, res) => {
    try {
      const { idcourse, idchapter, idlesson } = req.params
      const { type, value, button, language } = req.body
      await LessonChapter.findOneAndUpdate(
        {
          __id: idlesson,
          courseID: idcourse,
          chapterID: idchapter,
        },
        {
          $push: {
            content: {
              type,
              value,
              button,
              language,
            },
          },
        },
        { new: true }
      )
        .select("name slug content")
        .then(async (result) => {
          await deleteCache("courses")
          return res.status(201).json(result)
        })
        .catch((err) => {
          return res.status(400).json(err.message)
        })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  deleteContent: async (req, res) => {
    try {
      const { idcourse, idchapter, idlesson, idcontent } = req.params
      await LessonChapter.findOneAndUpdate(
        { _id: idlesson, courseID: idcourse, chapterID: idchapter },
        { $pull: { content: { _id: idcontent } } },
        { new: true }
      )
        .select("name slug content")
        .then(async (result) => {
          await deleteCache("courses")
          return res.status(200).json(result)
        })
        .catch((err) => {
          return res.status(400).json(err.message)
        })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  getContentById: async (req, res) => {
    try {
      const { idcourse, idchapter, idlesson, idcontent } = req.params
      await LessonChapter.findOne({
        _id: idlesson,
        chapterID: idchapter,
        courseID: idcourse,
        content: { _id: idcontent },
      })
        .then((result) => {
          return res.status(200).json(result)
        })
        .catch((err) => {
          return res.status(400).json(err.message)
        })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  getContent: async (req, res) => {
    try {
      const { slugcourse, idchapter, idlesson } = req.params
      const course = await Course.findOne({
        slug: slugcourse,
        public: true,
      })
        .then((result) => result)
        .catch((err) => {
          return res.status(400).json(err.message)
        })
      await LessonChapter.findOne({
        _id: idlesson,
        courseID: course._id,
        chapterID: idchapter,
      })
        .select("content -_id")
        .then((result) => {
          return res.status(200).json(result)
        })
        .catch((err) => {
          return res.status(400).json(err.message)
        })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  updateContentById: async (req, res) => {
    const { idcourse, idchapter, idlesson, idcontent } = req.params
    const { value, button, language } = req.body
    await LessonChapter.findOneAndUpdate(
      {
        _id: idlesson,
        chapterID: idchapter,
        courseID: idcourse,
        "content._id": idcontent,
      },
      {
        $set: {
          "content.$.value": value,
          "content.$.button": button,
          "content.$.language": language,
        },
      },
      { new: true }
    )
      .select("name slug content")
      .then((result) => {
        return res.status(200).json(result)
      })
      .catch((err) => {
        return res.status(400).json(err.message)
      })
  },
}

module.exports = lessonController
