const express = require("express");
const {
    createCoupon,
    getallCoupon,
    updateCoupon,
    deleteCoupon,
    getsingleCoupon
} = require("../controllers/CouponController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
//create  Coupon    
router
    .route("/create")
    .post(createCoupon);

//update  Coupon    
router
    .route("/update/:id")
    .put(updateCoupon);

//Delete  Coupon    
router
    .route("/delete/:id")
    .delete(deleteCoupon);

//single  Coupon    
router
    .route("/single/:id")
    .get(getsingleCoupon);

// getall  Coupon    
router
    .route("/all")
    .get(getallCoupon);


module.exports = router;