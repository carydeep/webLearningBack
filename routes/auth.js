const {registerUSer,loginUser,refreshToken,logoutUser} = require("../controllers/authController")
const {verifyToken} = require("../controllers/middlewareController")

const router = require("express").Router()

router.post("/register",registerUSer)
router.post("/login",loginUser)
router.post("/refreshToken",refreshToken)
router.post("/logout",verifyToken,logoutUser)

module.exports = router