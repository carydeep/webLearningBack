const {
  createExercise,
  getMyExercise,
  updateExercise,
  deleteExercise,
  publicExercise,
  privateExercise,
  getExercisePublic,
  getExerciseByID,
} = require("../controllers/exerciseController")
const { verifyToken } = require("../controllers/middlewareController")
const {
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = require("../controllers/questionController")

const router = require("express").Router()

router.get("/", getExercisePublic)
router.get("/:idexercise", getExerciseByID)
router.get("/myexercise/", verifyToken, getMyExercise)
router.post("/myexercise/post", verifyToken, createExercise)
router.patch("/myexercise/:idexercise", verifyToken, updateExercise)
router.delete("/myexercise/:idexercise", verifyToken, deleteExercise)
router.post("/myexercise/:idexercise/public", verifyToken, publicExercise)
router.post("/myexercise/:idexercise/private", verifyToken, privateExercise)
router.post("/myexercise/:idexercise/postquestion", verifyToken, addQuestion)
router.delete(
  "/myexercise/:idexercise/question/:idquestion",
  verifyToken,
  deleteQuestion
)
router.patch(
  "/myexercise/:idexercise/question/:idquestion",
  verifyToken,
  updateQuestion
)

module.exports = router
