const mongoose = require('mongoose');

const TestimonialsSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please Enter Your image"],
        unique: false
    },
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter Testimonials name"],
    },
    content: {
        type: String,
        trim: true,
        required: [true, "Please Enter Testimonials content "],
    },
    avatar: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
},
{ timestamps: true });

module.exports = mongoose.model('Testimonials',TestimonialsSchema);