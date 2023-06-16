const express = require("express");
const {
    createfeaturevalue,
    getallfeaturevalue,
    getsinglefeaturevalue,
    updatefeaturevalue,
    deletefeaturevalue
} = require("../controllers/featureValueController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router
    .route("/create")
    .post(createfeaturevalue);
router
    .route("/all")
    .get(getallfeaturevalue);
router
    .route("/single/:id")
    .get(getsinglefeaturevalue);

router
    .route("/:id")
    .put(updatefeaturevalue)
    .delete(deletefeaturevalue);

module.exports = router;