const express = require("express");
const {
    createproductfeature,
    getallproductfeature,
    getsingleproductfeature,
    updateproductfeature,
    deleteproductfeature
} = require("../controllers/productFeatureController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router
    .route("/create")
    .post(createproductfeature);
router
    .route("/all")
    .get(getallproductfeature);
router
    .route("/single")
    .get(getsingleproductfeature);

router
    .route("/")
    .put(updateproductfeature)
    .delete(deleteproductfeature);

module.exports = router;