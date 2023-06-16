const mongoose = require('mongoose');

const productfeatureSchema = mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    feature: [{
        featureId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'feature',
            // required: true
        },
        featurevalueId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'featurevalue',
            // required: true
        }],

    }],
    status: {
        type: Boolean,
        default: false
    },

},
    { timestamps: true });

module.exports = mongoose.model('productfeature', productfeatureSchema);