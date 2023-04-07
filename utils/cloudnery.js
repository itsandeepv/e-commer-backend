// const { resolve } = require('path');

const cloudinary = require('cloudinary').v2;


// Configuration 
cloudinary.config({
  cloud_name: "dfkrjwh5l",
  api_key: "672277124844951",
  api_secret: "DLi27qyjxexmSYq1Rg14JuFAppc"
});


// Upload

const cloudinaryuploadImg = async (imagetoUploads)=>{
    try {
        
    } catch (error) {
        console.log(error);
    }

//    new Promise((resolve)=>{
//     cloudinary.uploader.upload(imagetoUploads, (result)=>{
//         resolve({
//             url : result?.secure_url
//         },{
//             source_type : "auto"
//         })
//     })
//     })
}


module.exports = cloudinaryuploadImg







// // The output url
// console.log(url);