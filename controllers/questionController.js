const Exercise = require("../models/Exercise")
const Question = require("../models/Question")

const questionController = {
  addQuestion: async (req, res) => {
    try {
      const { name, options } = req.body
      const author = req.user.id
      const _id = req.params.idexercise
      const genus = options?.filter((option) => option.isRight === true)
      const newQuestion = await new Question({
        name,
        options,
        exerciseId: _id,
        genus: genus?.length <= 1 ? "one" : "mul",
      })
        .save()
        .then((result) => result)
        .catch((err) => {
          return res.status(400).json(err.message)
        })
      await Exercise.findOneAndUpdate(
        { author, _id },
        { $push: { questions: newQuestion._id } },
        { new: true }
      ).catch((err) => {
        return res.status(400).json(err.message)
      })
      return res.status(200).json(newQuestion)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  deleteQuestion: async (req, res) => {
    try {
      const { idexercise, idquestion } = req.params
      const author = req.user.id
      const deleteQues = await Question.findOneAndDelete({
        _id: idquestion,
        exerciseId: idexercise,
      })
        .then((result) => result)
        .catch((err) => {
          return res.status(400).json(err.message)
        })
      await Exercise.findOneAndUpdate(
        { _id: idexercise, author },
        { $pull: { questions: { _id: idquestion } } }
      ).catch((err) => {
        return res.status(400).json(err.message)
      })
      return res.status(200).json(deleteQues)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  updateQuestion: async (req, res) => {
    const { name, options } = req.body
    const { idexercise, idquestion } = req.params
    await Question.findOneAndUpdate(
      { exerciseId: idexercise, _id: idquestion },
      { name, options },
      { new: true }
    )
      .then((result) => {
        return res.status(200).json(result)
      })
      .catch((err) => {
        return res.status(400).json(err.message)
      })
  },
}

module.exports = questionController
