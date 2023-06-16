const mongoose = require('mongoose');
const connection = require('../config/database')

const otpSchema = new mongoose.Schema({
    _id: String,
    email: {
        type: String
    },
    otp :{
        type: Number
    },
    expiresIn :{
        type: Number
    }
},{
    timestamps : true,
});

const otps = connection.model('otps',otpSchema)
module.exports = otps;