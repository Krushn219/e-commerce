const express = require('express');

const router = express.Router();

const newslatterController = require("../controllers/newsController");

// router.post('/newsletter',(req,res)=>{
//     return res.send("Router is working..");
// })
router.post('/newsletter',newslatterController.newsletter);


module.exports = router;