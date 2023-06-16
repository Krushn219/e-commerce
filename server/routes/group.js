const express = require("express");
const {
  creategroup,
  getallgroup,
  getsinglegroup,
  updategroup,
  deletegroup,
  getsubcategory

} = require("../controllers/groupController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// create
router
  .route("/create")
  .post(creategroup);

// all 
router
  .route("/all")
  .get(getallgroup);

// get single 
router
  .route("/single/:id")
  .get(getsinglegroup);

router
  .route("/subcategory/:subcategory")
  .get(getsubcategory);

// update & delete 
router
  .route("/delete/:id")
  .put(updategroup)
  .delete(deletegroup);


module.exports = router;