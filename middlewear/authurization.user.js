const express = require("express");
const jwt = require("jsonwebtoken");
const New_user = require("../models/user_new");

const authuriz_User = async (req, res, next) => {
  const token = await req?.headers?.authorization?.startsWith("Bearer");
  const finded_token = await req?.headers?.authorization?.split(" ")[1];
  try {
    if (token) {
      const decoded_token = jwt.verify(finded_token, "SandeepIsTheKey");
      const user = await New_user.findById(decoded_token.id);
      req.user = user
      next();
    } else {
      res.status(500).json({
        message: "Authorization error",
      });
    }
  } catch (error) {
    res.status(500).json({
      messaege: "authorization Error " + error,
    });
  }
};

module.exports = { authuriz_User };
