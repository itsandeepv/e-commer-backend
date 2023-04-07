const mongoose = require("mongoose")

const brandSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    index:true
},

},{timestamps: true})



module.exports = mongoose.model("Brand" ,brandSchema)