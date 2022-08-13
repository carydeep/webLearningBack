const {
  addCourse,
  deleteCourse,
  getCourseByAuthor,
  getCourseBySlug,
  updateCourse,
  getCoursePublic,
  getCourseBySlugAndUSer,
} = require("../controllers/courseController")
const { getContent } = require("../controllers/lessonController")
const { verifyToken } = require("../controllers/middlewareController")

const router = require("express").Router()

router.get("/", getCoursePublic)
router.get("/mycourse", verifyToken, getCourseByAuthor)
router.get("/:slug/", getCourseBySlug)
router.get("/:slugcourse", verifyToken, getCourseBySlugAndUSer)
router.post("/post", verifyToken, addCourse)
router.delete("/:slugcourse", verifyToken, deleteCourse)
router.patch("/:slugcourse", verifyToken, updateCourse)
router.get(
  "/:slugcourse/chapter/:idchapter/lesson/:idlesson/content/",
  getContent
)

module.exports = router
