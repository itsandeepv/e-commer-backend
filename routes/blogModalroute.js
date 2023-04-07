const router = require("express").Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const {
  blogModalpost,
  blogAllget,
  blogModalupdate,
  blogModalgetSingle,
  delete_blog,
  bloglikes,
  blogdislikes,
} = require("../Controllar/blogModal_controolar");
const { authuriz_User } = require("../middlewear/authurization.user");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "public/images/blogs/"));
    console.log(path.dirname(__dirname));
  },
  filename: function (req, file, cb) {
    const unixSufix = Date.now() + "-" + Math.round(Math.random() * 1009);
    cb(null, file.fieldname + "-" + unixSufix + ".jpeg");
  },
});

// const filterimage = (req, res, cd) => {
//     log(req.mimetype)
//   if (req.mimetype?.startsWith("image")) {
//     cd(null, true);
//   } else {
//     cd({ massege: "file is not spported" }, false);
//   }
// };


const uploadPhoto = multer({
    storage: storage,
    // fileFilter: filterimage,
    limits: { fileSize: 2000000 },
  });
  
  







const blogModal_routes = router.post("/add-blog", authuriz_User,uploadPhoto.array("image" ,10) , blogModalpost);
const blogAllget_routes = router.get("/all-blogs/all", blogAllget);
const blogModalupdate_routes = router.put("/update-blog/:id", blogModalupdate);
const blogModalgetSingle_routes = router.get("/blog/:id", blogModalgetSingle);
const delete_blog_routes = router.delete("/delete-blog/:id", delete_blog);
const bloglikes_routes = router.put("/like-blog",authuriz_User, bloglikes);
const blogdislikes_routes = router.put("/dislike-blog",authuriz_User, blogdislikes);

module.exports = {
  blogModal_routes,
  blogAllget_routes,
  blogModalupdate_routes,blogdislikes_routes,
  blogModalgetSingle_routes,
  delete_blog_routes,
  bloglikes_routes
};
