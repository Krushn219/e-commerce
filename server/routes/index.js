const express = require('express')
const router = express.Router();
const homeControllers = require('../controllers/homeControllers')

router.get('/', homeControllers.home)

router.use('/user', require('./users'))

router.use('/products', require('./product'))

// MainCategory
router.use('/mainCategory', require('./mainCategory'))

//category 
router.use('/category', require('./Category'))

//subCategory 
router.use('/admin/subcategory', require('./SubCategory'))

//Group
router.use('/group', require('./group'))

// Testimonial
router.use('/testimonial', require('./Testimonial'))

//Blogs
router.use('/blogs', require('./Blogs'))
//Blogs
router.use('/banner', require('./banner'))

//Feature
router.use('/feature', require('./Feature'))

//Feature Value
router.use('/featurevalue', require('./FeatureValue'))

//Product Feature Value
router.use('/productfeature', require('./ProductFeature'))

//Address
router.use('/address', require('./Address'))

//coupon
router.use('/coupon', require('./Coupon'))

//Enquiry
router.use('/Enquiry', require('./Enquiry'))

//attribute
router.use('/attribute', require('./Attribute'))

//attribute Value
router.use('/attributevalue', require('./AttributeValue'))

//Product Attribute Value
router.use('/productattributes', require('./ProductAttribute'))

// Cart
router.use('/cart', require('./cart'))

//order
router.use('/order', require('./Order'))

//payment
router.use('/payment', require('./paymentRoute'))

//wishlist
router.use('/wishlist', require('./wishlist'))


// router.use('/newsletter',require('./newsletter'))    

module.exports = router