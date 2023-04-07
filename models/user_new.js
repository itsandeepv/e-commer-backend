const mongoose = require("mongoose")

const New_userSchema = new mongoose.Schema({
firstName:{
    type:String
},
lastName:{
    type:String
}
,email:{
    type:String
}
,password:{
    type:String
}
,mobile_number:{
    type:Number
}
,cart:[]
,
profilePic:{
    type:String
},
address:{
    type: String
},
wishlist:[{
    type:mongoose.Schema.Types.ObjectId  ,ref:"Product"
}],
user_type:{
    type:String,
    lowercase:true,
    default: "user"
}


},{timestamps: true} )


const New_user = mongoose.model("New_user" ,New_userSchema)
module.exports = New_user