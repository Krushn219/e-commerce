const mongoose = require('mongoose');

const attributeValueSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please Enter attributeValue name"],
    },
    attributeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'attribute',
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },

},
    { timestamps: true });

module.exports = mongoose.model('attributeValue', attributeValueSchema);