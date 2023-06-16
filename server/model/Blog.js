const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please Enter Your image"],
        unique: false
    },
    title: {
        type: String,
        trim: true,
        required: [true, "Please Enter blog name"],
    },
    description: {
        type: String,
        trim: true,
        required: [true, "Please Enter blog content "],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    avatar: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
},
{ timestamps: true });
module.exports = mongoose.model('blog',blogSchema);