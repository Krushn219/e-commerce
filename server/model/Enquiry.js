const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    enquiry: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});
module.exports = mongoose.model('Enquiry', EnquirySchema);
