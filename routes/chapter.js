const {
  addChapter,
  updateChapter,
  deleteChapter,
} = require("../controllers/chapterController")
const {
  publicCourse,
  privateCourse,
} = require("../controllers/courseController")
const { verifyToken } = require("../controllers/middlewareController")

const router = require("express").Router()

router.post("/:idcourse/chapter/post", verifyToken, addChapter)
router.patch("/:idcourse/chapter/:idchapter", verifyToken, updateChapter)
router.delete("/:idcourse/chapter/:idchapter", verifyToken, deleteChapter)
router.post("/:idcourse/public", verifyToken, publicCourse)
router.post("/:idcourse/private", verifyToken, privateCourse)

module.exports = router
