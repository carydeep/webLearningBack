const mongoose = require("mongoose")

const topicCourse = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is require"]
    }
})

module.exports = mongoose.model("TopicCourse",topicCourse)