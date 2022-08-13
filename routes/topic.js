const router = require("express").Router()
const {addTopicCourse, getTopicCourse} = require("../controllers/topicController")
const { verifyTokenAdmin } = require("../controllers/middlewareController")

router.post("/addtopic",verifyTokenAdmin,addTopicCourse)
router.get("/",getTopicCourse)

module.exports = router