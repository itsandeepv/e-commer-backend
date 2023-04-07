require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const new_userRoutes = require("./routes/new_userauth");
// const loginRoutes = require("./routes/log_inauth");
// const add_product = require("./routes/add_product");
const mongoose = require("mongoose");
const upload = require("./middlewear/upload");
var bodyParser = require("body-parser");
const multer = require("multer");
const morgen = require("morgan");
// const fileuplad= require("express-fileupload")
const {
  get_users,
  update_a_user,
  getSingle_users,
  userAddedbyadmin_route,
  getAddedbyadmin_route,
  deleteAddedbyadmin_route,
  updateAddedbyadmin_route,
  getSingleAddedbyadmin_route,
  get_alert_route,
  add_alert_route,
  delete_alert_note_route,
  addtoWishlistroute,
  getWishlistroute,
} = require("./routes/for_routes");


const {
  blogModal_routes,
  blogModalupdate_routes,
  blogModalgetSingle_routes,
  blogAllget_routes,
  delete_blog_routes,
  bloglikes_routes,
  blogdislikes_routes,
} = require("./routes/blogModalroute");
const {
  categoryRoute,
  getAllcategoryRoute,
  updatecategoryRoute,
  deletecategoryRoute,
} = require("./routes/category_route");
const { createbrandRoute } = require("./routes/brand_route");
const { getProduct, addProduct, updateProduct, deleteProduct, getsingleProduct, getdortProduct, productRatingRoute, createCoupenRoute, getCoupenRoute, deleteCoupenRoute, updateCoupenRoute, uploadimOnCloudinary, user_cartRoute, get_usercartRoute, emptyCartRoute, aaplyCoupenRoute, getUserOrderRoute, updateorderStatusRoute } = require("./routes/add_product");
const { AdminLogin, userLogin, userforgotpasswordroute } = require("./routes/log_inauth");
const { payNowRoute } = require("./routes/paymentRoute");

// database connection
// connection();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// middlewares
app.use(express.json());
app.use(cors());
app.use(morgen("dev"));
app.use(express.urlencoded({ extended: true }));
// app.use(fileuplad({ useTempFiles: true }));

const moongose_Url =
  "mongodb+srv://itsandeepverma:sandeepverma@cluster0.dx5zoyg.mongodb.net/?retryWrites=true&w=majority";
const moongose_Url2 =
  "mongodb://127.0.0.1:27017/5500?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0";

app.use("/api/register", upload.single("profilepic"), userRoutes);
// app.use("/api/add-new-user", userRoutes);
app.use("/api/login", authRoutes);



app.use("/api", new_userRoutes);
app.use("/api", AdminLogin);
app.use("/api", userLogin);
// app.use("/api", loginRoutes);
app.use("/api", get_users);
app.use("/api", getSingle_users);
app.use("/api", update_a_user);




//user password reset password

app.use("/api", userforgotpasswordroute);





//add/get to wish list route
app.use("/api", addtoWishlistroute);
app.use("/api", getWishlistroute);

//user cart routes

app.use("/api", user_cartRoute);
app.use("/api", get_usercartRoute);
app.use("/api", emptyCartRoute);

//product routes
app.use("/api", addProduct);
app.use("/api", getProduct);
app.use("/api", updateProduct);
app.use("/api", deleteProduct);
app.use("/api", getsingleProduct);
app.use("/api", getdortProduct);
app.use("/api", productRatingRoute);
app.use("/api", uploadimOnCloudinary);


//blog section started
app.use("/api", blogModal_routes);
app.use("/api", blogAllget_routes);
app.use("/api", blogModalupdate_routes);
app.use("/api", blogModalgetSingle_routes);
app.use("/api", delete_blog_routes);
app.use("/api", bloglikes_routes);
app.use("/api", blogdislikes_routes);


//category routes
app.use("/api", categoryRoute);
app.use("/api", getAllcategoryRoute);
app.use("/api", updatecategoryRoute);
app.use("/api", deletecategoryRoute);

//brand routes 
app.use("/api", createbrandRoute);



// admin add user
app.use("/api", userAddedbyadmin_route);
app.use("/api", getAddedbyadmin_route);
app.use("/api", deleteAddedbyadmin_route);
app.use("/api", updateAddedbyadmin_route);
app.use("/api", getSingleAddedbyadmin_route);

// alert notification section start
app.use("/api", get_alert_route);
app.use("/api", add_alert_route);
app.use("/api", delete_alert_note_route);



//coupen routes 

app.use("/api", createCoupenRoute);
app.use("/api", getCoupenRoute);
app.use("/api", deleteCoupenRoute);
app.use("/api", updateCoupenRoute);
//apply coupen
app.use("/api", aaplyCoupenRoute);


//order route
app.use("/api", getUserOrderRoute);
app.use("/api", updateorderStatusRoute);



//payment route start here
app.use("/api", payNowRoute);




mongoose
  .connect(moongose_Url2, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    // Successfully connected
    console.log("Your DataBase is Conneted succesfully ");
  })
  .catch((err) => {
    // Catch any potential error
    console.log(
      "Unable to connect to MongoDB. Error: Please Check Your EnterNet Connections " +
        err
    );
  });

const port = 5500;
app.listen(port, () => {
  console.log("server connect succesfully on host : " + port);
});
