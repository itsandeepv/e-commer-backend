const mongoose = require("mongoose")

const alert_noteficationSchema = new mongoose.Schema({
title:{
    type:String,
    required:true,
    trim:true,
    unique:true
},

},{timestamps: true})


const Alert_notefication = mongoose.model("Notefication" ,alert_noteficationSchema)
module.exports = Alert_notefication