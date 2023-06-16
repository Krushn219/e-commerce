const express = require("express");
const {
    createfeature,
    getallfeature,
    getsinglefeature,
    updatefeature,
    deletefeature
} = require("../controllers/featureController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router
    .route("/create")
    .post( createfeature);
router
    .route("/all")
    .get(getallfeature);
router
    .route("/single/:id")
    .get(getsinglefeature);

router
    .route("/:id")
    .put(updatefeature)
    .delete(deletefeature);

module.exports = router;