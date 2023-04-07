const mongoose = require("mongoose")

const userAddedbyadmin = new mongoose.Schema({
firstName:{
    type:String
},
lastName:{
    type:String
}
,email:{
    type:String
}

,mobile_number:{
    type:Number
}
,
user_type:{
    type:String,
    // default: "user"
}


},{timestamps: true} )


const userAddedby_admin = mongoose.model("UserAddedbyadmin" ,userAddedbyadmin)
module.exports = userAddedby_admin