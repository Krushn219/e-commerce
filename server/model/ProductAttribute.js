const mongoose = require('mongoose');

const productattributesSchema = mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    attributeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attribute',
        required: true
    },
    attributevalueId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attributeValue',
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
   
},
    { timestamps: true });

module.exports = mongoose.model('productattributes', productattributesSchema);