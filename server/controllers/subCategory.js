
const SubCategory = require('../model/SubCategory')
const fs = require('fs');
const path = require('path');
const Category = require('../model/Category');
const cloudinary = require("cloudinary").v2;
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_Secret,
});


async function uploadToCloudinary(locaFilePath) {
    var mainFolderName = "main";
    var filePathOnCloudinary =
        mainFolderName + "/" + locaFilePath;
    return cloudinary.uploader
        .upload(locaFilePath, { public_id: filePathOnCloudinary })
        .then((result) => {

            // Remove file from local uploads folder

            fs.unlinkSync(locaFilePath);

            return {
                message: "Success",
                url: result.url,
                result
            };
        })
        .catch((error) => {

            // Remove file from local uploads folder
            fs.unlinkSync(locaFilePath);
            return { message: "Fail", error };
        });
}

module.exports.createSubCaregory = catchAsyncErrors(async (req, res) => {

    var locaFilePath = req.file.path;
    var result = await uploadToCloudinary(locaFilePath);
    // Create new SubCategory
    let subCategory = new SubCategory({
        name: req.body.name,
        image: result.url,
        avatar: result.result.secure_url,
        cloudinary_id: result.result.public_id,
        category: req.body.category,
        maincategory: req.body.maincategory
    });

    // Save SubCategory
    await subCategory.save();

    const details = {
        subcategory: subCategory._id,
    }
    let currentCategory = await Category.findById({ _id: req.body.category })
    currentCategory.subCategories.push(details);
    currentCategory.save();

    if (!subCategory) {

        return res.status(500).send('SubCategory cannot be created')
    }

    res.status(201).json({
        success: true,
        subCategory,
        // result
    });

})

// module.exports.getAllSubCaregory = catchAsyncErrors(async (req, res) => {

//     try {
//         const subCategories = await SubCategory.find().populate("category").populate("maincategory");
//         const count = await SubCategory.countDocuments();

//         res.status(200).json({
//             success: true,
//             totalCategories: count,
//             subCategories
//         })
//     }
//     catch (error) {
//         res.status(404).json(error);
//     }

// })


module.exports.getAllSubCaregory = catchAsyncErrors(async (req, res, next) => {

    const resultPerPage = Number(req.query.limit);

    let totalSubCategory = await SubCategory.countDocuments();
    const sort = {};

    if (req.query.sortBy && req.query.SubCategoryBy) {
        sort[req.query.sortBy] = req.query.SubCategoryBy === 'desc' ? -1 : 1
    }

    const apiFeature = new ApiFeatures(SubCategory.find().populate("category").populate("maincategory").sort(sort), req.query)
        .filter()
        .search()
        .pagination(resultPerPage);
    let subCategories = await apiFeature.query;
    let filteredSubCategoryCount = subCategories.length;

    res.status(200).json({
        success: true,
        totalSubCategory: totalSubCategory,
        filteredSubCategory: filteredSubCategoryCount,
        page: req.query.page,
        limit: resultPerPage,
        subCategories
    })
})


module.exports.SingleSubCaregory = catchAsyncErrors(async (req, res) => {

    const result = await SubCategory.findById(req.params.id).populate('category').populate("maincategory");

    if (!result) {
        return res.status(404).json({ msg: "Cannot found subCategory" });
    }

    res.status(200).json({
        success: true,
        result
    })
})

// subCategory by category ID

module.exports.getSingleSubCaregory = catchAsyncErrors(async (req, res) => {

    let id = req.params.id;

    const result = await SubCategory.find({ category: id }).populate('category').populate("maincategory");

    if (!result) {
        return res.status(404).json({ msg: "Cannot found subCategory" });
    }

    res.status(200).json({
        success: true,
        result
    })
})

module.exports.deleteSingleSubCaregory = catchAsyncErrors(async (req, res) => {

    let id = req.params.id;
    // Find user by id
    let subCategory = await SubCategory.findById(id);
    if (!subCategory) {
        return res.status(404).json({ msg: "Cannot found subCategory or has already deleted...." });
    }

    // // Delete image from cloudinary
    await cloudinary.uploader.destroy(subCategory.cloudinary_id);

    const data = await SubCategory.findOneAndDelete({ _id: id });
    // Delete user from db
    await subCategory.remove();

    res.status(200).json({
        success: true,
        msg: "SubCategory Deleted Successfully..."
    })
})

module.exports.updateSubCaregory = catchAsyncErrors(async (req, res) => {

    try {
        let id = req.params.id;

        let subCategory = await SubCategory.findById(id);

        if (!subCategory) {
            return res.status(404).json({ msg: "Cannot found subCategory.." });
        }

        // Delete image from cloudinary
        await cloudinary.uploader.destroy(subCategory.cloudinary_id);

        // Upload image to cloudinary
        var locaFilePath = req.file.path;

        var result = await uploadToCloudinary(locaFilePath);

        const data = {
            name: req.body.name || subCategory.name,
            image: result.url,
            avatar: result.secure_url || subCategory.image,
            cloudinary_id: result.public_id || subCategory.cloudinary_id,
        };

        const updateSubCaregory = await SubCategory.findByIdAndUpdate(id, data, {
            new: true
        });

        res.status(200).json({
            success: true,
            msg: "Updated successfully...",
            updateSubCaregory
        })
    }
    catch (err) {
        res.status(404).json(err);
    }


})