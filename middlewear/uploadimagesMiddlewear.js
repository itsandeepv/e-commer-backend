const router = require("express").Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const { authuriz_User } = require("../middlewear/authurization.user");
const { log } = require("console");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "public/images"));
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
  
  




const productiamgeResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => { 
      await sharp(file?.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/product/${file.filename}`);
    })
  );
  next()
};

const blogsiamgeResize = async (req, res, next) => {
  if (!req.files) next();

  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile("public/images/product/" + file.filename);
    })
  );
};


module.exports = { uploadPhoto, productiamgeResize}
