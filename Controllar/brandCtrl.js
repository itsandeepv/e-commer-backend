const Brand = require("../models/brandmodal.js");

const Add_brand = async (req, res, next) => {
  try {
    const brand = await Brand.create(req.body);
    brand
      .save()
      .then((result) => {
        res.status(201).json({
          result,
        });
      })
      .catch((error) => {
        res.status(500).json({
          error,
        });
      });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};


const delete_category = async (req, res, next) => {
  try {
    const{ id} = req.params
    const brand = await Brand.findByIdAndDelete(id);
    res.status(200).json({
       brand,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const update_brand = async (req, res, next) => {
  try {
    const {id} =req.params
    const update_category = await Brand.findByIdAndUpdate(id,req.body , {new:true});
    res.status(200).json({
      update_category,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};


const get_brand = async (req, res, next) => {
  try {
    const get_category = await Brand.find();
    res.status(200).json({
      category: get_category,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};


module.exports = { Add_brand, get_brand ,update_brand,delete_category };
