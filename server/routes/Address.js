const express = require("express");
const {
    createaddress,
    getalladdress,
    getsingleaddress,
    updateaddress,
    deleteaddress,
    getuseraddress,
    deleteUserAddress,
    getaddress,
    getselectaddress
} = require("../controllers/addressController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


router
    .route("/create")
    .post(isAuthenticatedUser, createaddress);
router
    .route("/all")
    .get(isAuthenticatedUser, getalladdress);
router
    .route("/single/:id")
    .get(getsingleaddress);

router
    .route("/:id")
    .put(isAuthenticatedUser,updateaddress)
//     .delete(isAuthenticatedUser, deleteaddress);

router
    .route("/user")
    .get(isAuthenticatedUser, getuseraddress);

//Delete user address    
router
    .route("/:id")
    .delete(isAuthenticatedUser, deleteUserAddress);

router
    .route("/userSelect")
    .get(isAuthenticatedUser, getselectaddress);

// user & address(id)
router
    // .route("/user/:user/address/:id")
    // .get(getaddress);
    .route("/:id")
    .get(isAuthenticatedUser, getaddress);



module.exports = router;