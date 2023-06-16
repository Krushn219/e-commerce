const ErrorHander = require("../utils/errorhandaler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const jwt = require('jsonwebtoken');
const User = require("../model/user");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 404));
    }

    const decodedData = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = await User.findById(decodedData.user_id);

    next();
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.roal)) {
            return next(
                new ErrorHander(
                    `Role: ${req.user.role} is not allowed to access this resource`,
                    403
                )
            )
        }

        next();
    }
}