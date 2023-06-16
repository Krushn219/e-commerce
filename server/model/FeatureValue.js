const mongoose = require('mongoose');

const featurevalueSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter featurevalue name"],
    },
    feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'feature',
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    
},
    { timestamps: true });

module.exports = mongoose.model('featurevalue', featurevalueSchema);