const New_user = require("../models/user_new");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userAddedby_admin = require("../models/admin_useradded");
const cloudinary = require("cloudinary").v2;

const register = async (req, res, next) => {
  // console.log(req.file);
  try {
    const user = await New_user.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    if (req.body?.password) {
      bcrypt.hash(req.body.password, 10, function (error, hashPassword) {
        if (error) {
          res.json({
            error: error + "something went wrong !",
          });
        }
        if (req.file) {
          var profilePic = req.file.filename;
        }
        // const {path} = req.file;
        // var profilePic ="" ;
      
        let user = new New_user({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashPassword,
          user_type: req?.body?.user_type,
          profilePic: profilePic,
        });

        // console.log(user);
        user
          .save()
          .then((result) => {
            res.send({
              message: "New User Added Done",
              user: result,
            });
          })
          .catch((error) => {
            res.json({
              error: error,
              message: "Above error aa ri hai",
            });
          });
      });
    } else {
      res.json({
        error: "Something went Wrong ?",
      });
    }
  } catch (error) {
    res.json({
      error: "Something went Wrong ?",
    });
  }
};

//admin Section user added

const userAddedbyadmin = async (req, res, next) => {
  try {
    const user = await userAddedby_admin.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });
    }
    let user_new = new userAddedby_admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      user_type: req?.body?.user_type,
      mobile_number: req?.body?.mobile_number,
    });

    user_new
      .save()
      .then((result) => {
        res.send({
          message: "New User Added Done",
          user: result,
        });
      })
      .catch((error) => {
        res.json({
          error: error,
          message: "Above error aa ri hai",
        });
      });
  } catch (error) {
    res.json({
      error: "Something went Wrong ?" + error,
    });
  }
};

const getAddedbyadmin = async (req, res, next) => {
  try {
    const users = await userAddedby_admin.find();
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const deleteAddedbyadmin = async (req, res) => {
  try {
    const { id } = req.params;
    const delete_user = await userAddedby_admin.findByIdAndDelete(id);
    console.log(delete_user);
    res.status(200).json({
      message: "User Deleted Succesfully !",
      delete_user,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
const getSingleAddedbyadmin = async (req, res) => {
  try {
    const { id } = req.params;
    const single_user = await userAddedby_admin.findById(id);
   if(delete_user){
     res.status(200).json({
      single_user,
     });

   }else{
    message:"data not find"
   }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const updateAddedbyadmin = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    let update_user = await userAddedby_admin.findByIdAndUpdate(
      id,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        user_type: req?.body?.user_type,
        mobile_number: req?.body?.mobile_number,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "User Updated succesfully ",
      update_user,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

//new user data stated

const login_User = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    New_user.findOne({ email: email }).then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, function (error, result) {
          if (error) {
            res.json({
              error: error + "Password is not match",
            });
          }
          if (result) {
            let token = jwt.sign({ id: user.id }, "SandeepIsTheKey", {
              expiresIn: "1d",
            });
            res.json({
              message: "Login Succesfully",
              token: token,
              user: user,
            });
          } else {
            res.json({ error: "Wrong email and password !" });
          }
        });
      } else {
        res.json({
          message: "Please Check Your Email And Password !",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};



//update Password
// const User_updatepassword = async (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   try {
 
    



//   } catch (error) {
//     res.status(500).json({
//       error: error,
//     });
//   }
// };





// admin login

const login_Admin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    New_user.findOne({ email: email }).then((user) => {
    
      if(user?.user_type != "admin"){
        res.json({
          message: "Usertype is not valid",
        });
      }
console.log(user);

      if (user) {
        bcrypt.compare(password, user.password, function (error, result) {
          if (error) {
            res.json({
              error: error + "Password is not match",
            });
          }
          if (result) {
            let token = jwt.sign({ id: user.id }, "SandeepIsTheKey", {
              expiresIn: "1d",
            });
            res.json({
              message: "Login Succesfully",
              token: token,
              user: user,
            });
          } else {
            res.json({ error: "Wrong email and password !" });
          }
        });
      } else {
        res.json({
          message: "Please Check Your Email And Password !",
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};






const get_user = async (req, res, next) => {
  try {
    const users = await New_user.find();
    res.status(200).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
//get a single user
const getSingle_user = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).json({
        message: "User Is not Find Please Check Once !",
      });
    }

    console.log(id);
    const getUserInfo = await New_user.findById(id);

    if (getUserInfo) {
      res.status(200).json({
        getUserInfo,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
//update user

const update_user = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    let update_user = await New_user.findByIdAndUpdate(
      id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        mobile_number: req?.body?.mobile_number,
        email: req?.body?.email,
        address: req?.body?.address,
        password: hashPassword,
        user_type: req?.body?.user_type,
        profilePic: req?.file?.filename,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "User Updated succesfully ",
      update_user,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

//delete user
const delete_user = async (req, res) => {
  console.log(req.params);
  try {
    const { id } = req.params;
    const delete_user = await New_user.findByIdAndDelete(id);
    console.log(delete_user);
    res.status(200).json({
      message: "User Deleted Succesfully !",
      delete_user,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = {
  register,
  login_User,
  get_user,
  getSingle_user,
  delete_user,
  getAddedbyadmin,
  update_user,
  userAddedbyadmin,
  deleteAddedbyadmin,login_Admin,
  updateAddedbyadmin,getSingleAddedbyadmin
};
