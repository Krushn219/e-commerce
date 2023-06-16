const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    razorpay: {
        order_Creation_Id: {
            type: String,
            required: [true, "Please Enter orderCreationId"],
            trim: true,
        },
        razorpay_Payment_Id: {
            type: String,
            required: [true, "Please Enter razorpayPaymentId"],
            trim: true,
        },
        razorpay_Order_Id: {
            type: String,
            required: [true, "Please Enter razorpayOrderId"],
            trim: true,
        },
        razorpay_Signature: {
            type: String,
            required: [true, "Please Enter razorpaySignature"],
            trim: true,
        },
    },
    isPaid: {
        type: Boolean,
        trim: true,
        // required: true,
    },


},
    { timestamps: true }
);

module.exports = mongoose.model("payment", paymentSchema);


