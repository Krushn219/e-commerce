
const express = require("express");
const {

    paypayment,
    paymentResponse
} = require("../controllers/PaymentController");


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();


router
    .route("/payment/success")
    .post(isAuthenticatedUser, paypayment);
router
    .route("/payment/pay-res")
    .get(isAuthenticatedUser, paymentResponse);

module.exports = router;


