const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    maincategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'maincategory',
        required:true
    },
    subCategories: [{
        subcategory: {
            type: mongoose.Schema.ObjectId,
            ref: "SubCategory",
            require: true
        },
    }]

},
    { timestamps: true }
)

module.exports = mongoose.model("Category", categorySchema);


// const mongoose = require('mongoose');
// const categorySchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true
//     },
//     subCategories: [{
//         subcategory: {
//             type: mongoose.Schema.ObjectId,
//             ref: "SubCategory",
//             require: true
//         },
//         name: {
//             type: String,
//         },
//         image: {
//             type: String,

//         },
//     }]

// },
//     { timestamps: true }
// )

// module.exports = mongoose.model("Category", categorySchema);
