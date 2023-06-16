
const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, "Please Enter product title"],
    },
    image: [{
        type: String,
        required: [true, "Please Enter Your image"],
        unique: false
    }],
    withDiscount: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    isAvailable: {
        type: Boolean,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews:
        [{
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "users",
                required: true,
            },
            reviewTitle: {
                type: String
            },
            reviewDescription: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now(),
            },
        }],
    countInStock: {
        type: Number,
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    attributes: {
        type: String,
        trim: true,
        required: [true, "Please Enter  attributes"],
    },
    maincategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'maincategory',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'group',
        required: true
    },
    avatar: [{
        type: String
    }],
    cloudinary_id: [{
        type: String
    }],
    isTrending: {
        type: Boolean,
        default: false
    },
    isSpecial: {
        type: Boolean,
        default: false
    },
    isLatest: {
        type: String,
    },
    isBestSeller: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    productDetails: [{
        type: mongoose.Schema.ObjectId,
        ref: 'productfeature'
    }],
    productAttributes: {
        type: mongoose.Schema.ObjectId,
        ref: 'productattributes'
    },
    description: {
        inTheBox: [{
            content: {
                type: String,
                trim: true,
            },
        }],
        templatefeature: [{
            content: {
                type: String,
                trim: true,
            }
        }],
        performance: [{
            content: {
                type: String,
                trim: true,
            },
        }],
    },
    availableDate: {
        type: Date,
        // default:Date.now()
    },
},
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);










