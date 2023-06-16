const express = require("express");
const {
    createAttribute,
    getallAttribute,
    getsingleAttribute,
    updateAttribute,
    deleteAttribute
} = require("../controllers/attributeController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router
    .route("/create")
    .post( createAttribute);
router
    .route("/all")
    .get(getallAttribute);
router
    .route("/single/:id")
    .get(getsingleAttribute);

router
    .route("/:id")
    .put(updateAttribute)
    .delete(deleteAttribute);

module.exports = router;