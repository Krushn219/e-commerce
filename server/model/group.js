const mongoose = require('mongoose');

const groupSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maincategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'maincategory',
        required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required:true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required:true
    },
   
},
    { timestamps: true }
)

module.exports = mongoose.model("group", groupSchema);