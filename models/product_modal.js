const mongoose = require("mongoose");

const Product_Schema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
      type: String,
      trim: true,
      // required: true,
      lowercase: true,
    },
    country: {
      type: String,
    },
    quentity: {
      type: Number,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: String,
      // ref: "Category"
      trim: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    product_image: [],
    sold: {
      type: Number,
      default: 0,
      trim: true,
    },
    color: {
      type: String,
      trim: true,
      required: true,
    },
    brand: {
      type: String,
      trim: true,
      required: true,
    },
    ratings:[{
      star : Number,
      comment: String,
      postby: {type:mongoose.Schema.Types.ObjectId,ref:"User" }
    }
    ],
    totalRatings:{
      type:Number,
      default:0
    }
  },
  { timestamps: true },
);

const ProductSchema = mongoose.model("Product", Product_Schema);
module.exports = ProductSchema;
