import api, { apiFormdata, apiWithToken } from "./axios";

// user management
export const signUp = (data) => api('user/register', 'POST', data)
export const signIn = (data) => api('user/login', 'POST', data);
export const verifyOTP = (data) => apiFormdata('user/verifyOTP', 'POST', data);
export const Forgetpassword = (data) => api('user/forgetPassword', 'POST', data)
export const Resetpassword = (data, email) => api(`user/resetPassword/${email}`, 'POST', data)
export const UserSingle = (id) => apiWithToken(`user/single/${id}`, 'GET')

// change password
export const Changepassword = (data) => apiWithToken('user/changePassword', 'POST', data)

// product
export const getProducts = (filter = null) => api(filter === null ? 'products/all?limit=100' : `products/all?${filter}`, 'GET');
export const getFeaturedProduct = () => api('productfeature/all', 'GET');
export const getSingleProduct = (id) => api(`products/single/${id}`, 'GET')
export const AddProduct = (data) => apiFormdata(`products/addProduct`, 'POST', data)
export const DeleteProduct = (id = '') => api(`products/?id=${id}`, 'DELETE')
export const ProductUpdate = (id, data) => api(`products/update/${id}`, 'PUT', data)

// order
export const getAllOrders = () => api(`order/admin/orders`, 'GET')
export const getOrderDelivered = (id = '') => api(`order/Status/Delivered/vendor?vendor=${id}`, 'GET')
export const getOrderShipping = (id = '') => api(`order/Status/vendor/Shipped?vendor=${id}`, 'GET')
export const getOrderPending = () => api(`order/Status/processing`, 'GET')
export const DeleteOrder = (id) => api(`order/admin/${id}`, 'DELETE')
export const OrderSingle = (id) => api(`order/${id}`, 'GET')
export const OrderSinglewithId = (id) => api(`order/single/${id}`, 'GET')
export const getOrderMonth = (month) => api(`order/data/month?month=${month}`, 'GET')
export const OrderReturn = () => api(`order/return`, 'GET')

// category
export const getMainCategories = () => api('mainCategory/all', 'GET');
export const getCategories = (data) => api('category/all', 'GET', data);
export const getMainCategory = () => api('mainCategory/all', 'GET')
export const getCategory = (id) => api(`category/single/${id}`, 'GET')
export const getSubCategory = (id) => api(`admin/subcategory/single/${id}`, 'GET')
export const getallSubcategory = () => api(`admin/subcategory/all`, 'GET')
export const getSubCategoryproduct = (id) => api(`products/subCategory/${id}`, 'GET')
export const getCategoryproduct = (id) => api(`products/category/${id}`, 'GET')
export const getmainCategoryproduct = (id) => api(`products/maincategory/${id}`, 'GET')
export const getallGroup = () => api(`group/all`, 'GET')

// group
export const getCategoryGroup = (id) => api(`products/group/${id}`, 'GET')
export const getCategoryallGroup = (id) => api(`group/subcategory/${id}`, 'GET')

// testimonials
export const getTestimonials = () => api('testimonial/all', 'GET')

// blogs
export const getBlogs = () => api('blogs/all', 'GET')
export const getSingleBlog = (id) => api(`blogs/single/${id}`, 'GET')

// banner
export const getBanner = () => apiWithToken(`banner/all`, 'GET')
export const getBannerSingle = (id) => api(`banner/single/${id}`, 'GET')

// account
export const postAddress = (data) => apiWithToken(`address/create`, 'POST', data)
export const getAddress = () => apiWithToken('address/all', 'GET')
export const addressDelete = (id) => apiWithToken(`address/${id}`, 'DELETE')
export const addressUpdate = (id, data) => apiWithToken(`address/${id}`, 'PUT', data)
export const getAddressUser = (addressID) => apiWithToken(`address/user/${addressID}`, 'GET')
export const userUpdate = (data) => apiFormdata('user/update', 'PUT', data)
export const getSingleUser = () => apiWithToken('user/singleUser', 'GET')
export const getUserSelect = (id) => apiWithToken(`user/select/${id}`, 'GET')

// contact us
export const postCreatecontact = (data) => api('Enquiry/create', 'POST', data)

// usercart
export const getUserWithCart = () => apiWithToken(`cart/userCart`, 'GET')
export const postUpdateCart = (data) => apiWithToken('cart/updatecart', 'POST', data)
export const putCart = (id) => apiWithToken(`cart/${id}`, 'PUT')

//review
export const postReview = (data) => apiWithToken(`products/review`, 'PUT', data)

// checkout payment
export const postnewOrder = (data) => apiWithToken('order/new', 'POST', data)

// orderHistory
export const getOrder = () => apiWithToken('order', 'GET')

// wishlist
export const postWishlist = (data) => apiWithToken('wishlist/create', 'POST', data)
export const getWishlist = () => apiWithToken('wishlist/user', 'GET')
export const deleteWishList = (id, data) => apiWithToken(`wishlist/${id}`, 'DELETE', data)
export const getWishlistAll = () => apiWithToken(`wishlist/all`, 'GET')
export const getWishlistView = (id) => apiWithToken(`wishlist/single/${id}`, 'GET')

// Vendor Pannel
export const getVendor = () => apiWithToken('vendor/filterall', 'GET')
export const getVendorIdByProduct = (id, limit = " ", page = 1, name = '') => apiWithToken(`vendor/getAllProducts/${id}?limit=${limit}&page=${page}&keyword=${name}`, 'GET')
export const getVendorSingle = (id) => apiWithToken(`vendor/single/${id}`, 'GET')
export const getVendorOrder = (id = '') => apiWithToken(`order/vendor/orders?vendor=${id}`, 'GET')
export const getVendorOrderWithoutPagination = (id = '') => apiWithToken(`order/vendor/orders?vendor=${id}&limit=1000`, 'GET')

// Withdraw
export const postWithdraw = (data) => api('plan/withdraw', 'POST', data)

// Payment
export const paymentSuccess = (data) => apiWithToken('payment/success', 'POST', data)
export const paymentResp = () => apiWithToken('payment/pay-res', 'GET')

// Newsletter
export const newsletterSubscribe = (data) => api('newsletter/subscribe', 'POST', data)
