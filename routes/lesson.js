const {
  addLesson,
  updateLesson,
  deleteLesson,
  addContent,
  deleteContent,
  getContentById,
  updateContentById,
  getContent,
} = require("../controllers/lessonController")
const { verifyToken } = require("../controllers/middlewareController")

const router = require("express").Router()

router.post("/:idcourse/chapter/:idchapter/lesson/post", verifyToken, addLesson)
router.patch(
  "/:idcourse/chapter/:idchapter/lesson/:idlesson",
  verifyToken,
  updateLesson
)
router.delete(
  "/:idcourse/chapter/:idchapter/lesson/:idlesson",
  verifyToken,
  deleteLesson
)
router.post(
  "/:idcourse/chapter/:idchapter/lesson/:idlesson/content/post",
  verifyToken,
  addContent
)
router.delete(
  "/:idcourse/chapter/:idchapter/lesson/:idlesson/content/:idcontent",
  verifyToken,
  deleteContent
)
router.get(
  "/:idcourse/chapter/:idchapter/lesson/:idlesson/content/:idcontent",
  verifyToken,
  getContentById
)
router.patch(
  "/:idcourse/chapter/:idchapter/lesson/:idlesson/content/:idcontent",
  verifyToken,
  updateContentById
)
module.exports = router
