const express = require("express");
const {
  createwishlist,
  getallwishlist,
  getsinglewishlist,
  updatewishlist,
  deletewishlist,
  getuserwishlist,
  getwishlist
} = require("../controllers/wishlistController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// create
router
  .route("/create")
  .post(isAuthenticatedUser,createwishlist);

// all 
router
  .route("/all")
  .get(isAuthenticatedUser,getallwishlist);

// get single 
router
  .route("/single/:id")
  .get(getsinglewishlist);

// get user(id) 

router
  .route("/user")
  .get(isAuthenticatedUser,getuserwishlist);

// update & delete 
router
  .route("/:id")
  .put(isAuthenticatedUser,updatewishlist)
  .delete(isAuthenticatedUser,deletewishlist);

// user & wishlist(id)
router
  .route("/user/wishlist/:id")
  .get(isAuthenticatedUser,getwishlist);

module.exports = router;