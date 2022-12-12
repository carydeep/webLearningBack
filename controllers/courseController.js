const {
  removeVietnameseTones,
  getOrSetCache,
  deleteCache,
} = require("../commonFunction")
const Course = require("../models/Course")
const { createClient } = require("redis")
const client = createClient()

const courseController = {
  addCourse: async (req, res) => {
    try {
      const { name, group, topics, icon } = req.body
      const { id, username } = req.user
      let slug = removeVietnameseTones(name)
      const slugExist = await Course.exists({ slug })
      if (slugExist) {
        slug = slug + "-" + username
      }
      const slugExistInUser = await Course.exists({ slug })
      if (slugExistInUser)
        return res.status(400).json("Your already have this course name")
      const newCourse = new Course({
        name,
        slug,
        group,
        topics,
        icon,
        author: id,
      })
      await newCourse
        .save()
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
  getCourseByAuthor: async (req, res) => {
    try {
      const id = req.user.id
      const courses = await Course.find({ author: id }).populate({
        path: "chapters",
        select: "name slug lessons",
        populate: {
          path: "lessons",
          select: "name slug content",
        },
      })
      return res.status(200).json(courses)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  getCoursePublic: async (req, res) => {
    try {
      await getOrSetCache(`courses`, async () => {
        const courses = await Course.find({ public: true })
        return courses
      })
        .then((result) => {
          return res.status(200).json(result)
        })
        .catch((err) => {
          return res.status(400).json(err.message)
        })
      // await Course.find({ public: true })
      //   .then(async (result) => {
      //     await client.setEx("courses", 3600, JSON.stringify(result))
      //     return res.status(200).json(result)
      //   })
      //   .catch((err) => {
      //     return res.status(400).json(err.message)
      //   })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const slug = req.params.slugcourse
      const author = req.user.id
      const result = await Course.findOneAndDelete({ slug, author })
      await deleteCache(`course?slug=${slug}`)
      if (!result) return res.status(400).json("Could not find course !")
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  getCourseBySlug: async (req, res) => {
    try {
      const slug = req.params.slug
      await getOrSetCache(`courses?slug=${slug}`, async () => {
        const course = await Course.findOne({ slug, public: true }).populate({
          path: "chapters",
          select: "name slug lessons",
          populate: {
            path: "lessons",
            select: "name slug content",
          },
        })
        return course
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
  getCourseBySlugAndUSer: async (req, res) => {
    try {
      const slug = req.params.slug
      const author = req.user.id
      const course = await Course.findOne({ slug, author })
      if (!course) return res.status(400).json("Can't find this course!")
      return res.status(200).json(course)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  updateCourse: async (req, res) => {
    try {
      const slug = req.params.slugcourse
      const { name, group, topics, icon } = req.body
      const author = req.user.id
      const updatedCourse = await Course.findOneAndUpdate(
        { slug, author },
        { name, group, topics, icon },
        { new: true }
      )
      if (!updatedCourse) return res.status(400).json("Can't find course")
      await deleteCache("courses")
      return res.status(200).json(updatedCourse)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  publicCourse: async (req, res) => {
    try {
      const _id = req.params.idcourse
      const author = req.user.id
      await Course.findOneAndUpdate(
        { _id, author },
        {
          public: true,
        },
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
  privateCourse: async (req, res) => {
    try {
      const _id = req.params.idcourse
      const author = req.user.id
      await Course.findOneAndUpdate(
        { _id, author },
        {
          public: false,
        },
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

module.exports = courseController
