const mongoose = require('mongoose');
const connection = require('../config/database')

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'users',
        // required: true
    },
    address: {
        type: String,
        trim: true,
        required: true
    },
    addressComplement: {
        type: String,
        trim: true,
        required: true
    },
    city: {
        type: String,
        trim: true,
        required: true
    },
    state: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    postcode: {
        type: String,
        trim: true,
        required: true
    },

}, {
    timestamps: true,
});
module.exports = mongoose.model('address',addressSchema);