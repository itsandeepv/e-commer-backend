const AddedCategory = require("../models/category_modal");

const Add_category = async (req, res, next) => {
  try {
    const category = await AddedCategory.create(req.body);
    category
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
    const delete_category = await AddedCategory.findByIdAndDelete(id);
    res.status(200).json({
       delete_category,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

const update_category = async (req, res, next) => {
  try {
    const {id} =req.params
    const update_category = await AddedCategory.findByIdAndUpdate(id,req.body , {new:true});
    res.status(200).json({
      update_category,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};


const Get_category = async (req, res, next) => {
  try {
    const get_category = await AddedCategory.find();
    res.status(200).json({
      category: get_category,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
module.exports = { Add_category, Get_category ,update_category,delete_category };
