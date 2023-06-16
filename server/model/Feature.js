const mongoose = require('mongoose');

const featureSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter feature name"],
    },
    status: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true });

module.exports = mongoose.model('feature', featureSchema);