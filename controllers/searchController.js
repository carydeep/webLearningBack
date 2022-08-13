const Course = require("../models/Course")

const searchController = {
  search: async (req, res) => {
    try {
      const { q, group, topics } = req.query
      const arrtopics = topics.split(",")
      if (group && topics) {
        await Course.find({
          name: new RegExp(q),
          group,
          topics: { $all: arrtopics },
          public: true,
        })
          .then((result) => {
            return res.status(200).json(result)
          })
          .catch((err) => {
            return res.status(400).json(err.message)
          })
      } else if (group) {
        await Course.find({
          name: new RegExp(q),
          group,
          public: true,
        })
          .then((result) => {
            return res.status(200).json(result)
          })
          .catch((err) => {
            return res.status(400).json(err.message)
          })
      } else if (topics) {
        await Course.find({
          name: new RegExp(q),
          topics: { $all: arrtopics },
          public: true,
        })
          .then((result) => {
            return res.status(200).json(result)
          })
          .catch((err) => {
            return res.status(400).json(err.message)
          })
      } else {
        await Course.find({
          name: new RegExp(q),
          public: true,
        })
          .then((result) => {
            return res.status(200).json(result)
          })
          .catch((err) => {
            return res.status(400).json(err.message)
          })
      }
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
}

module.exports = searchController
