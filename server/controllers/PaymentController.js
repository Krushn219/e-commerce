const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const errorhandaler = require("../utils/errorhandaler");
const payment = require("../model/paymentModel");
const cart = require("../model/cart");
const Razorpay = require('razorpay');
const mongoose = require('mongoose');
const crypto = require("crypto");
require('dotenv').config()


// paypayment success

module.exports.paypayment = catchAsyncErrors(async (req, res) => {
    try {
        const {
            orderCreationId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        } = req.body;

        const cartDetails = await cart.findOne({ user: req.user.id }).populate('productDetail.product');


        cartDetails.productDetail = []
        cartDetails.save()

        const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

        const digest = shasum.digest("hex");

        if (digest !== razorpaySignature)
            return res.status(400).json({ msg: "Transaction not legit!" });

        await payment.create({
            razorpay: {
                order_Creation_Id: orderCreationId,
                razorpay_Payment_Id: razorpayPaymentId,
                razorpay_Order_Id: razorpayOrderId,
                razorpay_Signature: razorpaySignature
            }
        });

        res.json({
            msg: "success",
            orderId: razorpayOrderId,
            paymentId: razorpaySignature,
        });
    } catch (error) {
        res.status(500)
            .send(error);
    }
});

// paymentResponse

module.exports.paymentResponse = catchAsyncErrors(async (req, res) => {
    const payments = await payment.find();
    return res.status(201).json({
        payments,
    });

});
