const mongoose = require("mongoose");
const Newsletter = require("../model/newsletter");
const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

module.exports.newsletter = catchAsyncErrors(async (req, res) => {
    try {
        const isExist = await Newsletter.findOne({ email: req.body.email });
        if (isExist) {
            return res.status(200).json({
                msg: "Newsletter subscribed Successfully.."
            })
        }

        const data = await Newsletter.create({ email: req.body.email })
        return res.status(201).json({
            msg: "Newsletter Subscribed Successfully..."
        })
    }
    catch (err) {
        return res.status(500).json({ err });
    }
})
