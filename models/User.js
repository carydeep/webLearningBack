const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is requied"],
        minlength:[6,"Username can't be shorter than 6 characters"],
        maxlength:20,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is requied"],
        minlength:[8,"Password can't be shorter than 8 characters"],
        maxlength:100,
    },
    email:{
        type:String,
        required:[true,"Email is requied"],
        minlength:10,
        maxlength:50,
        unique:true
    },
    firstname:{
        type:String,
        required:[true,"Firstname is requied"],
        minlength:1,
        maxlength:20,
    },
    lastname:{
        type:String,
        required:[true,"Lastname is requied"],
        minlength:1,
        maxlength:20,
    },
    role:{
        type:String,
        default:"user"
    }
},{
    timestamps:true
}
)

module.exports = mongoose.model("User",userSchema)