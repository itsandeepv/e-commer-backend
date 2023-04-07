const {
  get_user,
  getSingle_user,
  delete_user,
  update_user,
  userAddedbyadmin,
  getAddedbyadmin,
  updateAddedbyadmin,
  deleteAddedbyadmin,
  getSingleAddedbyadmin,
} = require("../Controllar/Authcontrollar");

const router = require("express").Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const { authuriz_User } = require("../middlewear/authurization.user");
const { get_alert_note, alert_note, delete_alert_note, } = require("../Controllar/alert_ctrl");
const { addtoWishlist, getWishlist } = require("../Controllar/product_controllar");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "profileImages"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});
const uploadprofile = multer({ storage: storage });

const userAddedbyadmin_route = router.post(
  "/admin/add-user",
  authuriz_User,
  //  uploadprofile.single("profilePic"),
  userAddedbyadmin
);
const getAddedbyadmin_route = router.get(
  "/admin/get-user",
  // authuriz_User,

  getAddedbyadmin
);
const updateAddedbyadmin_route = router.put(
  "/admin/update-user/:id",
  // authuriz_User,
  updateAddedbyadmin
);
const getSingleAddedbyadmin_route = router.get(
  "/admin/get-single-user/:id",
  // authuriz_User,
  getSingleAddedbyadmin
);
const deleteAddedbyadmin_route = router.delete(
  "/admin/delete-user/:id",
  // authuriz_User,
  deleteAddedbyadmin
);
const get_users = router.get("/get-all-user", authuriz_User, get_user);




const getSingle_users = router.get("get-user-single/:id", getSingle_user);
const deleted_user = router.delete("/delete-user/:id", delete_user);
const update_a_user = router.put(
  "/update-user/:id",
  uploadprofile.single("profilePic"),
  update_user
  );
  
  
//add to wish list route

  const addtoWishlistroute = router.post("/add-to-wishlist", authuriz_User, addtoWishlist);
  const getWishlistroute = router.get("/get-wishlist", authuriz_User, getWishlist);


  
  // notefication Api start
  const add_alert_route = router.post("/add-notefication", alert_note);
  const get_alert_route = router.get("/get-notefication", get_alert_note);
  const delete_alert_note_route = router.delete("/delete-notefication/:id",authuriz_User, delete_alert_note);
  
  
  
  module.exports = {
  get_users,delete_alert_note_route,
  updateAddedbyadmin_route,
  deleteAddedbyadmin_route,
  getAddedbyadmin_route,
  userAddedbyadmin_route,
  getSingle_users,
  deleted_user,addtoWishlistroute,
  add_alert_route,get_alert_route,getWishlistroute,
  update_a_user,getSingleAddedbyadmin_route
};
