const mongoose = require("mongoose")

const Category_Schema = new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true,
},
category:{
    type:String,
    required:true,
    trim:true,
},

},{timestamps: true})


const AddedCategory = mongoose.model("Category" ,Category_Schema)
module.exports = AddedCategory