
const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51MpQYVSDrtZRTZDOdwRLvfKmD14W1afIx4fCzO2g70p6XFMsLGDozbGi2bhOE5Evi4xBDMTf74XHZFogOiS0F9Zi00oDgRLdHa')

const payNow =   async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:4242/success',
    cancel_url: 'http://localhost:4242/cancel',
  });

  res.json({
    message : "paymentDone",session

  });
}


module.exports = {payNow}