const {
  add_product,
  get_all_product,
  get_single_product,
  delete_product,
  update_product,
  get_all_productbysort,
  productRating,
  uploadImage,
} = require("../Controllar/product_controllar");
const router = require("express").Router();
const multer = require("multer");
const shortId = require("shortid");
const path = require("path");
const { authuriz_User } = require("../middlewear/authurization.user");
const {
  createCoupen,
  getCoupen,
  deleteCoupen,
  updateCoupen,
} = require("../Controllar/coupenCtrl");
const {
  uploadPhoto,
  productiamgeResize,
} = require("../middlewear/uploadimagesMiddlewear");
const {
  user_cart,
  get_usercart,
  emptyCart,
  applyCoupen,
  createOrder,
  getUserOrder,
  updateorderStatus,
} = require("../Controllar/userctrl");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "public/images/product/"));
  },
  filename: function (req, file, cb) {
    cb(null, shortId.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const addProduct = router.post(
  "/add-product",
  authuriz_User,
  upload.array("product_image"),
  // productiamgeResize,
  add_product
);
const getProduct = router.get(
  "/get-product/all",
  
  get_all_product
);
const getdortProduct = router.delete(
  "/get-product-sorted/all",
  get_all_productbysort
);
const updateProduct = router.put(
  "/update-product/:id",
  authuriz_User,
  upload.array("product_image"),
  update_product
);
const deleteProduct = router.delete(
  "/delete-product/:id",
  authuriz_User,
  delete_product
);
const getsingleProduct = router.get(
  "/get-single-product/:id",
  authuriz_User,
  get_single_product
);
const productRatingRoute = router.post(
  "/rate-a-product",
  authuriz_User,
  productRating
);

//to upload file on cloudinery on website

const uploadimOnCloudinary = router.put(
  "/upload-image-cloud/:id",
  authuriz_User,
  uploadPhoto.array("images", 10),
  // productiamgeResize,
  uploadImage
);

//coupen route is started here

const createCoupenRoute = router.post(
  "/create-coupen",
  authuriz_User,
  createCoupen
);

const getCoupenRoute = router.get("/get-coupen/all", authuriz_User, getCoupen);

const updateCoupenRoute = router.put(
  "/update-coupen/:id",
  authuriz_User,
  updateCoupen
);

const deleteCoupenRoute = router.delete(
  "/delete-coupen/:id",
  authuriz_User,
  deleteCoupen
);
//get coupen

const aaplyCoupenRoute = router.get(
  "/apply-coupen",
  authuriz_User,
  applyCoupen
);

//user cart route

const user_cartRoute = router.post("/cart", authuriz_User, user_cart);
const get_usercartRoute = router.get("/get-cart", authuriz_User, get_usercart);
const emptyCartRoute = router.delete("/delete-cart", authuriz_User, emptyCart);

//order functionality routes
const createOrderRoute = router.post(
  "/cart/cash-order",
  authuriz_User,
  createOrder
);
const getUserOrderRoute = router.get(
  "/cart/get-user-order",
  authuriz_User,
  getUserOrder
);
const updateorderStatusRoute = router.put(
  "/cart/update-order/:id",
  authuriz_User,
  updateorderStatus
);

module.exports = {
  addProduct,
  user_cartRoute,
  productRatingRoute,
  emptyCartRoute,
  getdortProduct,
  getCoupenRoute,
  updateProduct,
  createCoupenRoute,
  deleteProduct,
  updateCoupenRoute,
  getsingleProduct,
  deleteCoupenRoute,
  aaplyCoupenRoute,
  getProduct,
  createOrderRoute,
  uploadimOnCloudinary,
  get_usercartRoute,
  getUserOrderRoute,
  updateorderStatusRoute,
};
