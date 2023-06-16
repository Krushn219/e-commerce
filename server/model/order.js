const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "users",
        // required: true,
    },
    totalPrice: {
        type: Number,
        // required: true,
        default: 0,
    },
    orderStatus: {
        type: String,
        // required: true,
        default: "Processing",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    orderref: {
        type: String,
        default: "0"
    },
    shippingMethod: {
        type: String,
        default: "My Carrier"
    },
    orderNote: {
        type: String,
    },
    Payment: {
        type: String,
        default: "Case On Delivery"
    },
    deliveredAt: Date,
    cartdetails: [{

        // productId: {
        //     type: mongoose.Schema.ObjectId,
        //     required: true,
        //     ref: "Product"
        // },
        // quantity: Number,

    }]
});

module.exports = mongoose.model("Order", orderSchema);
