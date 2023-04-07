const ProductSchema = require("../models/product_modal");
const mongoose = require("mongoose");
const shortId = require("shortid");
var slugify = require("slugify");
const New_user = require("../models/user_new");
const cloudinaryuploadImg = require("../utils/cloudnery.js");
const fs =require("fs")


const cloudinary = require("cloudinary").v2;

// Configuration
cloudinary.config({
  cloud_name: "dfkrjwh5l",
  api_key: "672277124844951",
  api_secret: "DLi27qyjxexmSYq1Rg14JuFAppc",
});



mongoose.set("autoIndex", true);

const add_product = async (req, res, next) => {
  const files = req.files;
  try {
    const product = await ProductSchema.findOne({
      product_name: req.body.product_name,
    });

    let product_image = [];
    // if (req.files.length > 0) {
    //   req.files.map((file) => {
    //     product_image.push({ img: file?.originalname });
    //   });
    // }

    let url = [];
    console.log(url);
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      // const newpath = await uploader(path)
      await cloudinary.uploader.upload(path, (err, result) => {
        console.log(result?.url);
        url.push({
          img_url: result?.url,
        });
      });
      fs.unlinkSync(path)

    }

    if (product) {
      res.status(400).json({
        message: "Product is Already Exist Please Check!",
      });
    } else {
      let new_product = new ProductSchema({
        product_name: req.body?.product_name,
        slug: slugify(req.body?.product_name),
        price: req.body?.price,
        description: req.body?.description,
        quentity: req.body?.quentity,
        country: req.body?.country,
        category: req.body?.category,
        brand: req.body?.brand,
        color: req.body?.color,
        product_image :url
      });

      new_product
        .save()
        .then((result) => {
          res.status(200).json({
            message: "Product Add Succesfully",
            result,
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: error,
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

//const get product all

const get_all_product = async (req, res, next) => {
  try {
    const get_all_product = await ProductSchema.find();
    res.status(200).json({
      get_all_product,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};
const get_all_productbysort = async (req, res, next) => {
  const queryObj = { ...req.query };
  try {
    //filtering
    const exculfields = ["sort", "fields", "limit", "page"];
    exculfields?.map((elm) => delete queryObj[elm]);
    // console.log(queryObj, "queryStr");
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    const objquery = JSON.parse(queryStr);
    let product = ProductSchema.find({ objquery });

    console.log(queryStr, req.query.sort);

    //sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      product = product.sort(sortBy);
    } else {
      product = product.sort("-createdAt");
    }
    //limiting fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      product = product.select(fields);
    } else {
      product = product.select("-__v");
    }
    //pagination
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    product = product.skip(skip).limit(limit);
    if (req.query.page) {
      const productcount = await ProductSchema.countDocuments();
      if (skip >= productcount) {
        res.status(404).json({
          message: "This page is not Exist !",
        });
      }
    }
    console.log(skip, limit, page);

    const get_allproduct = await product;

    res.status(200).json({
      get_allproduct,
    });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

//const  single get product all

const get_single_product = async (req, res, next) => {
  try {
    const { id } = req.params;
    const get_single_product = await ProductSchema.findById(id);
    if (get_single_product) {
      res.status(200).json({
        get_single_product,
      });
    } else {
      res.status(500).json({
        message: "Product is not find please check id?",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

//const  update  product

const update_product = async (req, res, next) => {
  try {
    const { id } = req.params;

    let product_image = [];
    if (req.files.length > 0) {
      req.files.map((file) => {
        product_image.push({ img: file?.originalname });
      });
    }

    const update_product = await ProductSchema.findByIdAndUpdate(
      id,
      {
        product_name: req.body?.product_name,
        slug: slugify(req.body?.product_name),
        price: req.body?.price,
        description: req.body?.description,
        quentity: req.body?.quentity,
        country: req.body?.country,
        category: req.body?.category,
        brand: req.body?.brand,
        color: req.body?.color,
        product_image,
      },
      { new: true }
    );
    if (update_product) {
      res.status(200).json({
        message: "Product updated succesfully",
      });
    } else {
      res.status(500).json({
        message: "Product is not find please check id?",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

//const  delete product all

const delete_product = async (req, res, next) => {
  try {
    const { id } = req.params;
    const delete_product = await ProductSchema.findByIdAndDelete(id);
    if (delete_product) {
      res.status(200).json({
        message: "Product deleted succesfully",
      });
    } else {
      res.status(500).json({
        message: "Product is not find please check id?",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

//add product  wishlist also
const addtoWishlist = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  console.log(_id, productId);
  try {
    const user = await New_user.findById(_id);
    const alreadyAdded = await user?.wishlist.find(
      (id) => id.toString() == productId
    );
    console.log(user, alreadyAdded);
    if (alreadyAdded) {
      const findupdate = await New_user.findByIdAndUpdate(
        _id,
        {
          $pull: {
            wishlist: productId,
          },
        },
        { new: true }
      );
      res.status(200).json({
        message: "Product added to wishlist succesfully",
        findupdate,
      });
    } else {
      const findupdate = await New_user.findByIdAndUpdate(
        _id,
        {
          $push: {
            wishlist: productId,
          },
        },
        { new: true }
      );
      res.status(200).json({
        message: "Product added to wishlist succesfully",
        findupdate,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }
};
//get product  wishlist also
const getWishlist = async (req, res) => {
  const { _id } = req.user;
  
  try {
    const user = await New_user.findById(_id).populate("wishlist");
    if (user) {
      res.status(200).json({
        user,
      });
    } else {
     
      res.status(500).json({
        message: "user not find",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }
};

//add product to favrate or wishlist also
const addtoCart = async (req, res) => {
  const { _id } = req.user;
  const { productId } = req.body;
  try {
    const user = await New_user.findById(_id);
    const alreadyAdded = await user?.wishlist.find(
      (id) => id.toString() == productId.toString()
    );
    console.log(user, alreadyAdded);
    if (alreadyAdded) {
      const findupdate = await New_user.findByIdAndUpdate(
        _id,
        {
          $pull: {
            cart: productId,
          },
        },
        { new: true }
      );
      res.status(200).json({
        message: "Product removed to cart succesfully",
        findupdate,
      });
    } else {
      const findupdate = await New_user.findByIdAndUpdate(
        _id,
        {
          $push: {
            cart: productId,
          },
        },
        { new: true }
      );
      res.status(200).json({
        message: "Product added to cart succesfully",
        findupdate,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }
};

//product rating

const productRating = async (req, res) => {
  const { _id } = req.user;
  const { productId, star, comment } = req.body;
  try {
    const user = await New_user.findById(_id);
    const findproduct = await ProductSchema.findById(productId);
    console.log(findproduct ,productId);
    let alreadyRated = await findproduct?.ratings?.find(
      (userId) => userId?.postby?.toString() === _id.toString()
    );
    if (alreadyRated) {
      // const updateRating =
      await ProductSchema.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        { new: true }
      );

      // const product = await ProductSchema.findByIdAndUpdate(
      //   productId,
      //   {
      //     $pull: {
      //       ratings: {
      //         star: star,
      //         postby: _id,
      //       },
      //     },
      //   },
      //   { new: true }
      // );

      const getAllRating = await ProductSchema.findById(productId);
      const totalRatings = getAllRating?.ratings?.length;
      const ratingSum = getAllRating.ratings
        ?.map((item) => item?.star)
        .reduce((start, current) => start + current, 0);
      const actualRating = Math.round(ratingSum / totalRatings);

      const finalProduct = await ProductSchema.findByIdAndUpdate(
        productId,
        { totalRatings: actualRating },
        { new: true }
      );

      res.status(200).json({
        message: "Product rated updated succesfully",
        finalProduct,
      });
    } else {
      const product = await ProductSchema.findByIdAndUpdate(
        productId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postby: _id,
            },
          },
        },
        { new: true }
      );
      res.status(200).json({
        message: "Product rated succesfully",
        product,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }
};

//to upload file on cloudinery on website
const uploadImage = async (req, res, next) => {
  const { id } = req.params;
  // console.log(file);
  const files = req.files;
  try {
    // const uploader =
    // const file = req.files

    let url = [];
    console.log(url);
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      // const newpath = await uploader(path)
      await cloudinary.uploader.upload(path, (err, result) => {
        console.log(result?.url);
        url.push({
          img_url: result?.url,
        });
      });
    }

    // for(const file of files){
    //   const {path} = file
    //   const newpath = await uploader(path)
    //   url.push(newpath);
    //   // console.log(newpath,"<<<<<" ,file);
    // }
    // files?.map(async (fileitem) => {
    //   await cloudinary.uploader.upload(fileitem?.path, (err, result) => {
    //     console.log(result?.url);
    //     url.push(
    //       result?.url
    //     )
    //   });
    // });

    const product = await ProductSchema.findByIdAndUpdate(
      id,
      {
        product_image: url,
      },
      { new: true }
    );

    res.status(200).json({
      product,
    });
  } catch (error) {
    res.status(500).json({
      error: error + "sdfas",
    });
  }
};

module.exports = {
  add_product,
  productRating,
  get_all_productbysort,
  get_all_product,
  get_single_product,
  update_product,
  addtoWishlist,
  delete_product,
  uploadImage,getWishlist
};
