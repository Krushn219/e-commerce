const mongoose = require('mongoose');
const connection = require('../config/database')

const userSchema = new mongoose.Schema({
    // _id: String,
    firstname: {
        type: String,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    phone: {
        type: Number,
        minLength: [10, "Password should be greater than 10 characters"],

    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    birthday: {
        type: String,
        // required : true
    },
    token: {
        type: String
    },
    role: {
        type: String,
        default: "user",
    },
    receiveOffersFromOurPartner: {
        type: Boolean,
        trim: true,
        default: false
    },
    SignUpForOurNewsletter: {
        type: Boolean,
        trim: true,
        default: false
    },
    gender: {
        type: String
    },
    address: [{
        type: mongoose.Schema.ObjectId,
        ref: "address",
        require: true
    }],
    // addresses:
    //     [{
    //         user: {
    //             type: mongoose.Schema.ObjectId,
    //             ref: "users",
    //             required: true,
    //         },
    //         address: {
    //             type: String
    //         },
    //         addressComplement: {
    //             type: String,
    //             required: true,
    //         },
    //         city: {
    //             type: String,
    //             trim: true,
    //         },
    //         state: {
    //             type: String,
    //             trim: true,
    //         },
    //         country: {
    //             type: String,
    //             trim: true,
    //         },
    //         postcode: {
    //             type: String,
    //             trim: true,
    //         },
    //     }],
    selectedAddress: [{
        type: mongoose.Schema.ObjectId,
        ref: "address",
        require: true
    }],

}, {
    timestamps: true,
});
const users = connection.model('users', userSchema)
module.exports = users;