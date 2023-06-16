const mongoose = require('mongoose');
const connection = require('../config/database')

const cartSchema = new mongoose.Schema({
  
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                required: true,
                ref: "Product"
            },
          quantity: Number,
        //   price: Number
        }
      ]
},{
    timestamps : true,
});

const cart = connection.model('carts',cartSchema)
module.exports = cart;