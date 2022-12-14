const User = require("../models/User")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const assert = require("assert")

const authController = {
  registerUSer: async (req, res) => {
    try {
      const { username, password, email, firstname, lastname } = req.body
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      const checkUserExist = await User.exists({ username })
      if (checkUserExist) return res.status(400).json("Username already exist")
      const checkEmailExist = await User.exists({ email })
      if (checkEmailExist) return res.status(400).json("Email already exist")
      const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword,
        firstname: firstname,
        lastname: lastname,
      })
      const user = await newUser.save()
      return res.status(200).json(user)
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  generateToken: (user, expire, secretKey) => {
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        password: user.password,
        role: user.role,
      },
      secretKey,
      { expiresIn: expire }
    )
  },
  loginUser: async (req, res) => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username })
      if (!user) return res.status(404).json("Wrong user or password")
      const validPassword = await bcrypt.compare(password, user.password)
      if (!validPassword) return res.status(404).json("Wrong user or password")
      const accessToken = authController.generateToken(
        user,
        "60s",
        process.env.JWT_ACCESS_KEY
      )
      const refreshToken = authController.generateToken(
        user,
        "365d",
        process.env.JWT_REFRESH_KEY
      )
      const { password: pass, ...removePass } = user._doc
      return res.status(200).json({ ...removePass, accessToken, refreshToken })
    } catch (error) {
      return res.status(500).json(error.message)
    }
  },
  logoutUser: async (req, res) => {
    res.status(200).json("Logout successful")
  },
  refreshToken: async (req, res) => {
    const refreshToken = req.body.token
    if (!refreshToken) return res.status(401).json("You're not authenticated")
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) return res.status(403).json("Refresh token is not valid")
      const newAcessToken = authController.generateToken(
        user,
        "60s",
        process.env.JWT_ACCESS_KEY
      )
      const newRefreshToken = authController.generateToken(
        user,
        "365d",
        process.env.JWT_REFRESH_KEY
      )
      res
        .status(200)
        .json({ accessToken: newAcessToken, refreshToken: newRefreshToken })
    })
  },
}

module.exports = authController
