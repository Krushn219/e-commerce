const express = require("express");
const {
    createProductAttributes,
    getAllProductAttributes,
    getSingleProductAttributes,
    updateProductAttributes,
    deleteProductAttributes
} = require("../controllers/productAttributeController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router
    .route("/create")
    .post(createProductAttributes);
router
    .route("/all")
    .get(getAllProductAttributes);
router
    .route("/single/:id")
    .get(getSingleProductAttributes);

router
    .route("/:id")
    .put(updateProductAttributes)
    .delete(deleteProductAttributes);

module.exports = router;