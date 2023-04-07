const { register, login_User } = require("../Controllar/Authcontrollar");
const router = require("express").Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "profileImages"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});
const uploadprofile = multer({ storage: storage });

router.post("/new-user-register",
 uploadprofile.single("profilePic"),
  register);
// router.post("/user-login", login_User)
module.exports = router;
