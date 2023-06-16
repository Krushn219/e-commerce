const mongoose = require('mongoose');

const attributeSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter attribute name"],
    },
    status: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true });

module.exports = mongoose.model('attribute', attributeSchema);