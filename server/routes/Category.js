const express = require("express");

const {
  createCategory,
  getAllCategory,
  getSingleCategory,
  deleteSingleCategory,
  updateCategory,
  getCategory,
} = require("../controllers/categoryController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// create
router.route("/create").post(createCategory);

// all
router.route("/all").get(getAllCategory);

//subcategory by category id
router.route("/").get(getCategory);

// get single
router.route("/single/:id").get(getSingleCategory);

// delete
router.route("/single/:id").delete(deleteSingleCategory);
//
router.route("/:id").put(updateCategory);

module.exports = router;
