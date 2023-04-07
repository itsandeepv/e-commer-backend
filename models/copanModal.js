const mongoose = require("mongoose")

const Coupan_Schema = new mongoose.Schema({
name:{
    type:String,
    required:true,
    trim:true,
},
expriy:{
    type:Date,
    
},
discount:{
    type:Number,
    default:0
    
},

},{timestamps: true})


 
module.exports =mongoose.model("Coupen" ,Coupan_Schema)