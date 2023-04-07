const { payNow } = require("../Controllar/paymentCtrl");

const router = require("express").Router();

const payNowRoute =  router.post("/create-checkout-session", payNow)
// const AdminLogin  = router.post("/admin-login", login_Admin)


module.exports = {payNowRoute}