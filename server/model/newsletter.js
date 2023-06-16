const mongoose = require('mongoose');
const validator = require("validator");

const newsletterSchema = mongoose.Schema({
    email : {
        type : String,
        required :[true,"Plese Enter your Email.."],
        unique : true,
        validate : [validator.isEmail,"Plese Enter Valid Email.."]
    },
    
},
{ timestamps: true });

module.exports = mongoose.model('NewsLatter',newsletterSchema);