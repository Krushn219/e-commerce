const mongoose = require('mongoose');

const subCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    cloudinary_id: {
        type: String
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    maincategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'maincategory',
        required:true
    },
},
    { timestamps: true }
)

module.exports = mongoose.model("SubCategory", subCategorySchema);