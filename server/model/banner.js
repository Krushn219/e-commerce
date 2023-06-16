const mongoose = require('mongoose');
const bannerSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please Enter Your image"],
        unique: false
    },
    offer: {
        type: String,
        trim: true,
        required: [true, "Please Enter banner name"],
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please Enter banner content "],
    },
    avatar: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
},
    { timestamps: true });
module.exports = mongoose.model('banner', bannerSchema);