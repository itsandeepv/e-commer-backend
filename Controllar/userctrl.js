const New_user = require("../models/user_new");
const Cart = require("../models/cartmodal");
const ProductSchema = require("../models/product_modal");
const Coupen = require("../models/copanModal.js");
const Order = require("../models/ordermodal.js");
const uneqid = require("uniqid");

const user_cart = async (req, res, next) => {
  const { cart } = req.body;
  const { _id } = req.user;
  try {
    let products = [];
    const finduser = await New_user.findById(_id);

    const alreadyaddedtocart = await Cart.findOne({ orderby: finduser._id });
    // console.log(_id,finduser,cart);
    if (alreadyaddedtocart) {
      alreadyaddedtocart.remove();
    }

    for (let i = 0; i < cart?.length; i++) {
      let object = {};
      object.product = cart[i].product;
      object.count = cart[i].count;
      object.color = cart[i].color ? cart[i].color : "Not Added";
      let getprice = await ProductSchema.findById(cart[i].product)
        .select("price")
        // console.log(getprice.price);
      object.price = getprice?.price;
      products.push(object);
    }
    let carttotal = 0;
    for (let i = 0; i < products?.length; i++) {
      carttotal = carttotal + products[i].price * products[i].count;
    }
    let newcart = await Cart.create({
      product: products,
      cartTotal: carttotal,
      orderby: finduser._id,
    });

    newcart.save();
    res.status(200).json({
      message: "add to cart suucesfull",
      newcart,
    });
  } catch (error) {
    res.status(500).json({
      error: "something wrong " + error,
    });
  }
};

//get user cart
const get_usercart = async (req, res) => {
  const { _id } = req.user;

  try {
    const usercart = await Cart.findOne({ orderby: _id }).populate(
      "product.product"
    );
    if (usercart) {
      res.status(200).json({
        usercart,
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

const emptyCart = async (req, res) => {
  const { _id } = req.user;
  try {
    const finduser = await New_user.findById(_id);
    const deleteCart = await Cart.findOneAndRemove({ orderby: finduser._id });
    res.status(200).json({
      deleteCart,
    });
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }
};

const applyCoupen = async (req, res) => {
  const { coupen } = req.body;
  const { _id } = req.user;
  try {
    const validCoupen = await Coupen.findOne({ name: coupen });
    // console.log(validCoupen);

    if (validCoupen == null) {
      res.status(500).json({
        message: "Invalid Coupen !",
      });
    }

    const finduser = await New_user.findOne({ _id });
    let { cartTotal } = await Cart.findOne({
      orderby: finduser._id,
    }).populate("product.product");

    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupen.discount) / 100
    ).toFixed(2);

    // const finalcart =
    await Cart.findOneAndUpdate(
      { orderby: finduser._id },
      {
        totalAfterDiscount: totalAfterDiscount,
      },
      { new: true }
    );

    res.status(200).json({
      totalAfterDiscount,
    });
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }
};

// order section start here
const createOrder = async (req, res) => {
  const { COD, coupenApplied } = req.body;
  const { _id } = req.user;
  try {
    if (!COD) {
      res.status(500).json({
        message: "create cash order felled",
      });
    }
    const finduser = await New_user.findById(_id);
    const finduserCart = await Cart.findOne({ orderby: finduser._id });
    let finalAmount = 0;
    if (coupenApplied && finduserCart.totalAfterDiscount) {
      finalAmount == finduserCart.totalAfterDiscount;
    } else {
      finalAmount = finduserCart.cartTotal;
    }

    const neworder = await new Order({
      product: finduserCart.product,
      paymentIntent: {
        id: uneqid(),
        amount: finalAmount,
        method: "COD",
        status: "Cash on Delivery",
        created: Date().now,
        currency: "USD",
      },
      orderby: finduser._id,
      orderStatus: "Cash on Delivery",
    });

    neworder.save();
    // here we updating product details after sold product
    let updateproductdetails = await finduserCart?.product?.map((item) => {
      return {
        updateOne: {
          filter: { id: item.product?._id },
          update: { $inc: { quentity: -item.count, sold: +item.count } },
        },
      };
    });

    let updateddetials = await ProductSchema.bulkWrite(
      updateproductdetails,
      {}
    );

    res.status(200).json({
      message: "order placed succesfully",
      neworder,
      updateddetials,
    });
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }
};

//get user order

const getUserOrder = async (req, res) => {
  const { _id } = req.user;
  try {
    const finduser = await New_user.findById(_id);
    if (!finduser) {
      res.status(500).json({
        message: " invalid user ID",
      });
    }
    const finduserOrder = await Order.findOne({
      orderby: finduser._id,
    }).populate("product.product");

    res.status(200).json({
      finduserOrder,
    });
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }
};

//update order status only admin can update the order status

const updateorderStatus = async (req, res) => {
  const { id } = req.params;
  const { _id } = req.user;
  const { status } = req.body;
console.log(req.user);
  try {
    const findadmin = await New_user.findById(_id);
    if (findadmin.user_type != "Admin" && findadmin.user_type != "admin") {
      res.json({
        message: "Unauthorized !",
      });
    }
    const findorder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: status,
        paymentIntent: {
          status: status,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "status updated success",
      findorder,
    });
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }
};




const payNowbuyorder =   async (req, res) => {


  const { COD, coupenApplied } = req.body;
  const { _id } = req.user;
  try {
    if (!COD) {
      res.status(500).json({
        message: "create cash order felled",
      });
    }
    const finduser = await New_user.findById(_id);
    const finduserCart = await Cart.findOne({ orderby: finduser._id });
    let finalAmount = 0;
    if (coupenApplied && finduserCart.totalAfterDiscount) {
      finalAmount == finduserCart.totalAfterDiscount;
    } else {
      finalAmount = finduserCart.cartTotal;
    }

    const neworder = await new Order({
      product: finduserCart.product,
      paymentIntent: {
        id: uneqid(),
        amount: finalAmount,
        method: "COD",
        status: "Cash on Delivery",
        created: Date().now,
        currency: "USD",
      },
      orderby: finduser._id,
      orderStatus: "Cash on Delivery",
    });

    neworder.save();
    // here we updating product details after sold product
    let updateproductdetails = await finduserCart?.product?.map((item) => {
      return {
        updateOne: {
          filter: { id: item.product?._id },
          update: { $inc: { quentity: -item.count, sold: +item.count } },
        },
      };
    });

    let updateddetials = await ProductSchema.bulkWrite(
      updateproductdetails,
      {}
    );



    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'USD',
            product_data: finduserCart.product,
            unit_amount: finalAmount,
          },
          quantity: finduserCart.product?.quantity,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/',
      cancel_url: 'http://localhost:3000/login',
    });
  
    res.status(200).json({
      message: "order placed succesfully",
      session,
    });
  } catch (error) {
    res.status(500).json({
      error: " please check once " + error,
    });
  }

}








module.exports = {
  user_cart,
  applyCoupen,
  get_usercart,
  emptyCart,
  getUserOrder,
  createOrder,updateorderStatus
};
