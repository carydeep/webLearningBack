const { addGroupCourse, getGroupCourse } = require("../controllers/groupController")
const { verifyTokenAdmin } = require("../controllers/middlewareController")

const router = require("express").Router()

router.post("/addgroup",verifyTokenAdmin,addGroupCourse)
router.get("/",getGroupCourse)

module.exports = router