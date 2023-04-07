const mongoose = require("mongoose");

const Blog_Schema = new mongoose.Schema(
  {
    title: {
      type: String,
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

    numView: {
      type: Number,
      default: 0,
    },
    isdisliked: {
      type: Boolean,
      default: false,
    },
    isliked: {
      type: Boolean,
      default: false,
    },
    likes: [
      {
        type: mongoose.Schema.Types?.ObjectId,
        ref: "User",
      },
    ],
    dislikes: [
      {
        type: mongoose.Schema.Types?.ObjectId,
        ref: "User",
      },
    ],
    images:[],
    
    author: {
      type: String,
      default: "Admin",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlogSchema = mongoose.model("Blog", Blog_Schema);
module.exports = BlogSchema;
