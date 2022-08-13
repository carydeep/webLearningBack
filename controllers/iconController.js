const IconCourse = require("../models/Icon")

const iconController = {
  addIconCourse: async (req, res) => {
    try {
      const { name, value } = req.body
      const newIcon = new IconCourse({ name, value })
      const icon = await newIcon.save()
      return res.status(200).json(icon)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  getIconCourse: async (req, res) => {
    try {
      const icons = await IconCourse.find().select("name value -_id")
      return res.status(200).json(icons)
    } catch (error) {
      return res.status(500).json(error)
    }
  },
}

module.exports = iconController
