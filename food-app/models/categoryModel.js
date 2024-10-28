const mongoose = require('mongoose')

//Schema
const categorySchema = new mongoose.Schema({
   title : {
    type : String,
    required :[true,"category title is requird"]
   },
   imgUrl : {
    type : String,
    default : "https://images.unsplash.com/photo-1721332153289-0c46dc38981b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
   }
},{timestamps:true})

//export
module.exports = mongoose.model("Category",categorySchema)