
const router = require("express").Router();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router.post("/upload-image", upload.array("image"), async function (req ,res ,next) {
console.log(res, req);
    res.status(200).json({
        message:"uploaded done"
    })
})

module.exports = router