const { userforgotpassword } = require("../Controllar/alert_ctrl");
const { login_User, login_Admin } = require("../Controllar/Authcontrollar");

const router = require("express").Router();

const userLogin =  router.post("/user-login", login_User)
const AdminLogin  = router.post("/admin-login", login_Admin)

const userforgotpasswordroute  = router.put("/forgot-password", userforgotpassword)

module.exports = {userLogin,AdminLogin ,userforgotpasswordroute}