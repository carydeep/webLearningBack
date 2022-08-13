const User = require("../models/User")
const bcrypt = require("bcrypt")

const userController = {
  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body
      const user = req.user
      if (!oldPassword || !newPassword)
        return res.status(400).json("Password not null")
      const validPassword = await bcrypt.compare(oldPassword, user.password)
      if (!validPassword)
        return res.status(404).json("Your old password not true")
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)
      const updatePassword = await User.findOneAndUpdate(
        { _id: user.id },
        { password: hashedPassword },
        { new: true }
      )
      if (!updatePassword) return res.status(401).json("User not found")
      return res.status(200).json("Update password success")
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  changeProfile: async (req, res) => {
    try {
      const { firstname, lastname } = req.body
      if (!firstname && !lastname)
        return res.status(400).json("Need one to update")
      const _id = req.user.id
      const updateProfile = await User.findOneAndUpdate(
        { _id },
        {
          firstname,
          lastname,
        },
        { new: true }
      )
      if (!updateProfile) return res.status(401).json("User not found")
      return res.status(200).json("Updated success!")
    } catch (error) {
      return res.status(500).json(error)
    }
  },
  getAllUser: async (req, res) => {
    try {
      await User.find()
        .select("username")
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

module.exports = userController
