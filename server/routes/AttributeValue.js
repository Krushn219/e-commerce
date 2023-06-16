const express = require("express");
const {
    createAttributevalue,
    getallAttributevalue,
    getsingleAttributevalue,
    updateAttributevalue,
    deleteAttributevalue
} = require("../controllers/attributeValueController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router
    .route("/create")
    .post(createAttributevalue);
router
    .route("/all")
    .get(getallAttributevalue);
router
    .route("/single/:id")
    .get(getsingleAttributevalue);

router
    .route("/:id")
    .put(updateAttributevalue)
    .delete(deleteAttributevalue);

module.exports = router;