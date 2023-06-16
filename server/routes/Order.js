const express = require("express");
const {
    newOrder,
    getSingleOrder,
    myOrders,
    singleOrders,
    getAllOrders,
    updateOrder,
    getDeliveredstatus,
    getShippedstatus,
    deleteOrder,
    filtersOrderall,
    filtersOrder,
    filtersOrderyear,
    filtersOrderweek
} = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// new
router
    .route("/new")
    .post(isAuthenticatedUser, newOrder);

// get single
router
    .route("/:id")
    .get(getSingleOrder);

//  my order
router
    .route("/")
    .get(isAuthenticatedUser, myOrders);

//  my order
router
    .route("/single/:user")
    .get(singleOrders);

// all
//  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

router
    .route("/Status/Delivered")
    .get(getDeliveredstatus);

router
    .route("/Status/Shipped")
    .get(getShippedstatus);

router
    .route("/Status/Shipped")
    .get(getShippedstatus);

router
    .route("/admin/orders")
    .get(getAllOrders);

// update & delete
router
    .route("/admin/:id")
    .put(updateOrder)
    .delete(deleteOrder);

// all Order
router
    .route("/filters/all")
    .get(filtersOrderall);

//  Order(month)
router
    .route("/data/month")
    .get(filtersOrder);

//  Order (year)
router
    .route("/data/allyear")
    .get(filtersOrderyear);

// Order(week)
router
    .route("/data/week")
    .get(filtersOrderweek);
module.exports = router;