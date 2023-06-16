const express = require('express')
const router = express.Router();
const cartController = require('../controllers/cartController')
const { verifyToken } =require('../jwt/jsonwebtoken')
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.delete('/deleteCart/:id',cartController.deleteCart)
router.post('/updatecart',isAuthenticatedUser,cartController.updateCart)
// router.delete('/:id',cartController.deleteCart)

// user Id- Cart
router.get('/userCart',isAuthenticatedUser,cartController.getsinglecart)

//cart delete ProductID
router.put("/:productId",isAuthenticatedUser,cartController.singleproductdelete)

module.exports = router