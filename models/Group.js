const mongoose = require("mongoose")

const groupCourse = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is require"]
    }
})

module.exports = mongoose.model("GroupCourse",groupCourse)