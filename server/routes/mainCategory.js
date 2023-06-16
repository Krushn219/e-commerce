const express = require("express");
const {
  createmainCategory,
  getallmainCategory,
  getsinglemainCategory,
  updatemainCategory,
  deletemainCategory
} = require("../controllers/mainCategoryController");

const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


// create
router
  .route("/create")
  .post(createmainCategory);

// all
router
  .route("/all")
  .get(getallmainCategory);

// get single
router
  .route("/single/:id")
  .get(getsinglemainCategory);

// update & delete
router
  .route("/:id")
  .put(updatemainCategory)
  .delete(deletemainCategory);

module.exports = router;