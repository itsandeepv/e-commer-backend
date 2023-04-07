const UserNotefication = require("../models/notefication_modal");

// add notefication
const UserNotefication_post = async (req, res) => {
  try {
    const notefication = new UserNotefication(req.body);

    notefication
      .save()
      .then((result) => {
        res.status(200).json({
          result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

// get notefication
const get_notefication = async (req, res) => {
  try {
    const notefication = await UserNotefication.find();
    res.status(500).json({
      notefication,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

module.exports = { UserNotefication_post,get_notefication };
