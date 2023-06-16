const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
    Coupon_code: {
        type: String,
        trim: true,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now(),
        required: true,
    },
    end_date: {
        type: Date,
        default: Date.now() + 7 * 24 * 60 * 60 * 1000,
        required: true,
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model('Coupon', CouponSchema);