const mongoose = require('mongoose')

//Schema
const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"Username is required"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    address:{
        type:Array,
    },
    phone:{
        type:String,
        required:[true,"Phone Number is required"]
    },
    userType:{
        type:String,
        default:"client",
        enum:['client','vendor','admin','driver']

    },
    profile:{
        type:String,
        default:"https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
    },
    answer:{
        type: String,
        required:[true,"Answer is required default"]
    }
},{timestamps:true})

//export
module.exports = mongoose.model("User",userSchema)