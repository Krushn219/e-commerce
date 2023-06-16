const express = require("express");
const {
    createEnquiry,
    getallEnquiry,
    updateEnquiry,
    deleteEnquiry,
    getsingleEnquiry
} = require("../controllers/EnquiryController");
const router = express.Router();

//create  Enquiry    
router
    .route("/create")
    .post(createEnquiry);

//update  Enquiry    
router
    .route("/update/:id")
    .put(updateEnquiry);

//Delete  Enquiry    
router
    .route("/delete/:id")
    .delete(deleteEnquiry);

//single  Enquiry    
router
    .route("/single/:id")
    .get(getsingleEnquiry);

// getall  Enquiry    
router
    .route("/all")
    .get(getallEnquiry);


module.exports = router;