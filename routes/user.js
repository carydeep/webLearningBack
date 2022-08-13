const { verifyToken } = require("../controllers/middlewareController")
const {
  changeProfile,
  changePassword,
  getAllUser,
} = require("../controllers/userController")

const router = require("express").Router()

router.patch("/changeprofile", verifyToken, changeProfile)
router.patch("/changepassword", verifyToken, changePassword)
router.get("/", getAllUser)

module.exports = router
