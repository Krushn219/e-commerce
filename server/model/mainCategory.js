const mongoose = require('mongoose');

const maincategorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        // required: [true, "Please Enter maincategory name"],
    },
    status: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true });

module.exports = mongoose.model('maincategory', maincategorySchema);