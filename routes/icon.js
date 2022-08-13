const { addIconCourse, getIconCourse } = require("../controllers/iconController")
const { verifyTokenAdmin } = require("../controllers/middlewareController")

const router = require("express").Router()

router.post("/addicon",verifyTokenAdmin,addIconCourse)
router.get("/",getIconCourse)

module.exports = router