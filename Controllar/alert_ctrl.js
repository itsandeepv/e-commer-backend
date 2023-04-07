const Alert_notefication = require("../models/alert_notification");
const New_user = require("../models/user_new");

const alert_note = async (req, res) => {
  try {
    const findAlert = await Alert_notefication.findOne({
      title: req.body.title,
    });
    if (findAlert) {
      res.status(200).json({
        message: "This notification is already existv  !",
      });
    }
    const alert_notefication = await Alert_notefication.create(req.body);
    alert_notefication
      .save()
      .then((result) => {
        res.status(200).json({
          result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error + " something went wrong !",
        });
      });
  } catch (error) {
    res.status(500).json({
      error: "there is an err" + error,
    });
  }
};

// delete notification
const delete_alert_note = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const delete_notefication = await Alert_notefication.findByIdAndDelete(
        id
      );
      res.status(200).json({
        message: "notication deleted succesfully",
        delete_notefication,
      });
    } else {
      res.status(500).json({
        message: "not find olease check id",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

// get notification
const get_alert_note = async (req, res) => {
  try {
    const getAll_notefication = await Alert_notefication.find();
    res.status(200).json({
      getAll_notefication,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};









// user forgot password

const userforgotpassword =async (req,res)=>{
  const {email} = req.body
  try {
    const finduser = await New_user.findOne({email: email})
    // console.log(finduser);

    if(!finduser){
      res.status(404).json({
        message: "User is not find with this email !",
      }); 
    }




  } catch (error) {
    res.status(500).json({
      error: error,
    }); 
  }
}







module.exports = {userforgotpassword, alert_note, delete_alert_note, get_alert_note };
