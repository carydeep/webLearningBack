const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const iconRoute = require("./routes/icon")
const groupRoute = require("./routes/group")
const topicRoute = require("./routes/topic")
const courseRoute = require("./routes/course")
const chapterRoute = require("./routes/chapter")
const lessonRoute = require("./routes/lesson")
const exerciseRoute = require("./routes/exercise")
const searchRoute = require("./routes/search")

dotenv.config()

const app = express()

mongoose
  .connect(process.env.URL_CONNECT_DB, () => {
    console.log("DB connected")
  })
  .catch((err) => {
    console.log(err)
  })

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)
app.use(cookieParser())
app.use(express.json())

app.use("/v1/auth", authRoute)
app.use("/v1/user", userRoute)
app.use("/api/icon", iconRoute)
app.use("/api/group", groupRoute)
app.use("/api/topic", topicRoute)
app.use("/api/course", courseRoute)
app.use("/api/course/mycourse", chapterRoute)
app.use("/api/course/mycourse", lessonRoute)
app.use("/api/exercise", exerciseRoute)
app.use("/api/search", searchRoute)

const PORT = 6969
app.listen(PORT || 6969, () => {
  console.log("Server is running")
})
