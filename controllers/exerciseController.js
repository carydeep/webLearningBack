const Exercise = require("../models/Exercise")
const Question = require("../models/Question")

const exerciseController = {
  getMyExercise: async (req, res) => {
    try {
      const author = req.user.id
      await Exercise.find({
        author,
      })
        .populate("questions")
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
  createExercise: async (req, res) => {
    try {
      const { name, coCreator } = req.body
      const author = req.user.id
      const newExercise = new Exercise({
        name,
        author,
        coCreator,
      })
      await newExercise
        .save()
        .then((result) => {
          return res.status(201).json(result)
        })
        .catch((err) => {
          return res.status(400).json(err.message)
        })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  updateExercise: async (req, res) => {
    try {
      const { name, coCreator } = req.body
      const author = req.user.id
      const _id = req.params.idexercise
      await Exercise.findOneAndUpdate(
        { _id, author },
        { name, coCreator },
        { new: true }
      )
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
  deleteExercise: async (req, res) => {
    try {
      const author = req.user.id
      const _id = req.params.idexercise
      await Exercise.findOneAndDelete({ _id, author })
        .then(async (result) => {
          await Question.deleteMany({ exerciseId: result._id })
          return res.status(200).json(result)
        })
        .catch((err) => {
          return res.status(400).json(err.message)
        })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  publicExercise: async (req, res) => {
    try {
      const _id = req.params.idexercise
      const author = req.user.id
      await Exercise.findOneAndUpdate(
        { _id, author },
        { public: true },
        { new: true }
      )
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
  privateExercise: async (req, res) => {
    try {
      const _id = req.params.idexercise
      const author = req.user.id
      await Exercise.findOneAndUpdate(
        { _id, author },
        { public: false },
        { new: true }
      )
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
  getExercisePublic: async (req, res) => {
    try {
      await Exercise.find({ public: true })
        .populate("questions")
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
  getExerciseByID: async (req, res) => {
    try {
      const _id = req.params.idexercise
      await Exercise.findOne({ _id, public: true })
        .populate("questions")
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
}

module.exports = exerciseController
