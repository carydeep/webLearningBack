const { removeVietnameseTones, deleteCache } = require("../commonFunction")
const Course = require("../models/Course")
const ChapterCourse = require("../models/Chapter")
const LessonChapter = require("../models/Lesson")

const chapterController = {
  addChapter: async (req, res) => {
    try {
      const name = req.body.name
      if (!name) return res.status(400).json("Name is require")
      const idcourse = req.params.idcourse
      const idUser = req.user.id
      const slugChapter = removeVietnameseTones(name)
      const course = await Course.findOne({ _id: idcourse, author: idUser })
      if (!course) return res.status(400).json("Can't find course")
      const isChapterExist = await ChapterCourse.findOne({
        slug: slugChapter,
        courseID: course._id,
      })
      if (isChapterExist)
        return res.status(400).json("Chapter is already exist")
      const chapter = new ChapterCourse({
        name,
        slug: slugChapter,
        courseID: course._id,
      })
      const newChapter = await chapter
        .save()
        .then((result) => result)
        .catch((err) => {
          return res.status(400).json(err.message)
        })
      const addChapterToCourse = await Course.findOneAndUpdate(
        { _id: course._id, author: idUser },
        { $push: { chapters: newChapter._id } },
        { new: true }
      ).populate({
        path: "chapters",
        select: "name slug lessons",
        populate: {
          path: "lessons",
          select: "name slug content",
        },
      })
      await deleteCache("courses")
      return res.status(201).json(addChapterToCourse)
    } catch (err) {
      return res.status(500).json(err.message)
    }
  },
  updateChapter: async (req, res) => {
    try {
      const { name } = req.body
      const { idcourse, idchapter } = req.params
      const author = req.user.id
      await ChapterCourse.findOneAndUpdate(
        { _id: idchapter, courseID: idcourse },
        { name }
      ).catch((err) => {
        return res.status(400).json(err.message)
      })
      const course = await Course.findOne({ _id: idcourse, author }).populate({
        path: "chapters",
        select: "name slug lessons",
        populate: {
          path: "lessons",
          select: "name slug content",
        },
      })
      await deleteCache("courses")
      return res.status(200).json(course)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  deleteChapter: async (req, res) => {
    try {
      const { idcourse, idchapter } = req.params
      const userID = req.user.id
      const chapter = await ChapterCourse.findOneAndDelete({
        _id: idchapter,
        courseID: idcourse,
      })
        .then((result) => result)
        .catch((err) => {
          return res.status(400).json(err.message)
        })
      await LessonChapter.deleteMany({ chapterID: chapter._id })
      await Course.findOneAndUpdate(
        { _id: idcourse, author: userID },
        { $pull: { chapters: chapter._id } },
        { new: true }
      )
        .populate({
          path: "chapters",
          select: "name slug lessons",
          populate: {
            path: "lessons",
            select: "name slug content",
          },
        })
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
}

module.exports = chapterController
