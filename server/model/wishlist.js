const mongoose = require('mongoose');
const connection = require('../config/database')

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        // required: true
    },
    name: {
        type: String,
        trim: true,
    },
    quantities: {
        type: Number,
        default: 0,
    },
    viewed: {
        type: Number,
        default: 0,
    },
    Default: {
        type: Boolean,
        default: false
    },
    directlink: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            trim: true,
            // required: true,
        },
        quantity: {
            type: Number,
            default: 1,
        },
        priority: {
            type: String,
            default: "medium",
            trim: true,
        }
    }],

}, {
    timestamps: true,
});
module.exports = mongoose.model('wishlistes', wishlistSchema);