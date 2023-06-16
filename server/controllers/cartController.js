const shortid = require('shortid')
const Cart = require('../model/cart')
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");



module.exports.updateCart = catchAsyncErrors(async (req, res) => {
  try {
    let cart = await Cart.findOne({
      user: req.user._id
    });
    if (cart) {
      //cart exists for user
      let itemIndex = cart.products.findIndex(p => p.productId == req.body.productId);
      if (itemIndex > -1) {

        //product exists in the cart, update the quantity
        let productItem = cart.products[itemIndex];
        productItem.quantity = req.body.quantity || productItem.quantity + 1;
        cart.products[itemIndex] = productItem;

      } else {
        //product does not exists in cart, add new item
        cart.products.push({
          productId: req.body.productId,
          quantity: req.body.quantity || 1,

        });

      }

      cart = await cart.save();

      return res.status(200).json({
        success: true,
        msg: "Cart Updated Successfully..",
        cart
      });

    } else {
      //no cart for user, create new cart
      const newCart = await Cart.create({
        user: req.user._id,
        products: [{
          productId: req.body.productId,
          quantity: req.body.quantity || 1,
          // price: req.body.price
        }]
      });


      return res.status(201).json({
        success: true,
        msg: "Cart Created Successfully..",
        newCart
      });
    }
  } catch (err) {
    return res.status(404).json({
      err: err
    })
  }
})

module.exports.deleteCart = catchAsyncErrors(async (req, res) => {
  try {
    const data = await Cart.findByIdAndDelete(req.params.id)
    if (!data) {
      return next(new ErrorHander("cart not found", 404));
    }
    return res.status(200).json({
      message: 'cart deleted successfully'
    })
  }
  catch (err) {
    return res.status(404).json({ err })
  }
})

// Cart delete through productID

exports.singleproductdelete = catchAsyncErrors(async (req, res, next) => {
  try {

    let result = await Cart.find({ user: req.user.id })

    let productID = [];

    for (let i = 0; i < result[0].products.length; i++) {
      productID.push(result[0].products[i].productId)
    }
    for (i = 0; i < productID.length; i++) {
      if (productID[i] == req.params.productId) {
        let product = await Cart.updateOne(
          { user: req.user.id },
          { $pull: { products: { productId: req.params.productId } } }

        )
        let result = await Cart.find({ user: req.user.id });
        return res.status(200).json({
          success: true,
          result,
          message: "product Delete Successfully",

        });
      }
    }
    return res.status(404).json({
      success: false,
      message: "Cannot found product",

    });

  }
  catch (err) {
    return res.status(404).json({ err })
  }

});

// user cart

exports.getsinglecart = catchAsyncErrors(async (req, res, next) => {

  let user = await Cart.find({ user: req.user._id }).populate("products.productId");
  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }
  else {
    res.status(200).json({
      success: true,
      user,
    });
  }
});


