const mongoose = require("mongoose");

const Order_Schema = new mongoose.Schema(
  {
    product: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: {
          type: Number,
        },
        color : String
      },
    ],

    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not Proccesed",
      enum: [
        "Not Proccesed",
        "Cash on Delivery",
        "Proccesing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    orderby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order_Schema);
