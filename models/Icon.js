const mongoose = require("mongoose")

const iconCourse = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is require"]
    },
    value:{
        type:String,
        required:[true,"Value is require"],
        unique:true
    }
})

module.exports = mongoose.model("IconCourse",iconCourse)