import React from 'react'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faLocationDot, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../Components/Sidebar'
import logovendor from '../../assets/Images/logovendor.jpg'
import storevendor1 from '../../assets/Images/storevendor1.jpg'
import product1 from '../../assets/Images/Products/1.jpg'
import cart from "../../assets/Images/Product Cart Icon.png";
import { useState } from 'react'
import { getProducts, getVendorIdByProduct, getVendorSingle, postCreatecontact } from '../../Utils/APIs'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import Timer from '../../Components/Timer'
import { filterProducts } from '../../Utils/Data'

const Vendor = ({ search }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [toggleCategory, settoggleCategory] = useState()
  const [Productlist, setProductlist] = useState([])
  const [singlevendor, setsinglevendor] = useState({})
  // const [modalShow, setModalShow] = useState(false);
  // const [item, setitem] = useState({})
  const [featuredProducts, setfeaturedProducts] = useState([]);
  const [bestsellerProducts, setbestsellerProducts] = useState([]);
  const [value, setvalue] = useState({
    name: '',
    email: '',
    enquiry: ''
  })

  const EnquirycontactAPI = async () => {
    if (validate(value.name, value.email, value.enquiry)) {
      try {
        const data = {
          name: value.name,
          email: value.email,
          enquiry: value.enquiry
        };
        const res = await postCreatecontact(data);
        if (res.status === 201) {
          toast.info("New Enquiry added")
        }
        else {
          toast.error("Enquiry not added")
        }
        setvalue(data)
      } catch (e) {
        toast.error("User Already Exist. Please Login")
      }
    }
  };

  const validate = () => {
    const { name, email, enquiry } = value
    if (!name & !email & !enquiry) {
      toast.error("Please fill up all the fields")
      return false;
    }

    if (!name) {
      toast.error("Please enter your name")
      return false;
    }

    if (!email) {
      toast.error("Please enter your email")
      return false;
    }

    if (!enquiry) {
      toast.error("Please enter enquiry")
      return false;
    }

    return true;
  }

  const onChangeHandler = (e) => {
    setvalue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  const toggleHandler = () => {
    settoggleCategory(!toggleCategory);
  };

  useEffect(() => {
    productAPI()
    FeaturedProductsAPI()
    bestSellerProductsAPI()
  }, [])

  useEffect(() => {
    VendorSingleAPI(id)
  }, [id])

  const productAPI = async () => {
    try {
      setProductlist([]);
      const res = await getVendorIdByProduct(id);
      setProductlist(res?.data?.vendors);
    } catch (error) {
      toast(error);
    }
  }

  const VendorSingleAPI = async (id) => {
    try {
      setProductlist([]);
      const res = await getVendorSingle(id);
      setsinglevendor(res?.data?.vendors);
    } catch (error) {
      toast(error);
    }
  }

  const FeaturedProductsAPI = async () => {
    try {
      setfeaturedProducts([]);
      const res = await getProducts("isfeatured=true");
      setfeaturedProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  const bestSellerProductsAPI = async () => {
    try {
      setbestsellerProducts([]);
      const res = await getProducts("isbestseller=true");
      setbestsellerProducts(filterProducts(res?.data?.productlist || []));
    } catch (error) {
      toast(error);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  // const openProductModal = (item) => {
  //   setitem(item);
  //   setModalShow(true);
  // }

  return (
    <>
      {/* <ViewModal product={item} show={modalShow} onHide={closeModal} /> */}
      <div className="category-main-wrapper vendor-main-wrapper">
        <div className="container">
          <div className="py-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Vendor
                </li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12">
              <div className="vendor-sidebar-wrapper">
                <div className='vendor-category'>
                  <div className="widget-title" onClick={toggleHandler}>
                    <span>All Products</span>
                  </div>
                  <ul className=''>
                    {Productlist.map((item) => {
                      return <li key={item.id}>{item.title}</li>
                    })}
                  </ul>
                </div>
                <div className='vendor-contact'>
                  <div className="widget-title">
                    <span>Contact Vendor</span>
                  </div>
                  <input
                    type="text"
                    name='name'
                    placeholder="Add name"
                    onChange={onChangeHandler}
                    value={value.name} />
                  <input
                    type="email"
                    name='email'
                    placeholder="Add Email Address"
                    onChange={onChangeHandler}
                    value={value.email} />
                  <textarea
                    type="text"
                    name='enquiry'
                    placeholder="Add Enquiry"
                    onChange={onChangeHandler}
                    value={value.enquiry} />
                  <button className='send-message' onClick={EnquirycontactAPI}>Send Message</button>
                </div>
                <Sidebar featuredProducts={featuredProducts} bestsellerProducts={bestsellerProducts} />
              </div>
            </div>
            <div className="col-lg-9 col-md-12 col-sm-12">
              <div className='vendor-right-wrapper'>
                <div className='store store-banner mb-4'>
                  <div className="store-media">
                    <img src={storevendor1} alt='img' className='img-fluid' />
                  </div>
                  <div className="store-content">
                    <div className="seller-brand">
                      <img src={logovendor} alt='img' />
                    </div>
                    <h4 className="store-title">{singlevendor.firstname} {singlevendor.lastname}</h4>
                    <ul>
                      <li className='store-address'>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <div>{singlevendor?.customer_support?.address_1} {singlevendor?.customer_support?.address_1}, <br /> {singlevendor?.customer_support?.city} , {singlevendor?.customer_support?.postcode_zip}</div>
                      </li>
                      <li className='store-phone'>
                        <FontAwesomeIcon icon={faPhone} />
                        <div>{singlevendor.Phone}</div>
                      </li>
                      <li className='store-reviews'>
                        <FontAwesomeIcon icon={faStar} />
                        <div>4.33 rating from 3 reviews</div>
                      </li>
                      <li className='store-open'>
                        <FontAwesomeIcon icon={faBagShopping} />
                        <div>Store Open</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='title vendor-product-title '>
                  <h2>Products</h2>
                </div>
                <div className="row mb-4">
                  {Productlist?.length ? Productlist
                    .filter(
                      (item) =>
                        item.title.toLowerCase().includes(search)
                    )
                    .map((element) => {
                      return <div className="col-lg-4 col-md-4 col-sm-6" key={element.id}>
                        <div className="product-itemmain me-3">
                          <div className="thumbnail-container">
                            <div className="tabproductmain-wrapper grid">
                              <div className="tabproductmain-image">
                                <div
                                  className="thumbnail product-thumbnail"
                                  onClick={() => handleProductClick(element._id)}
                                >
                                  <img
                                    src={element?.avatar[0] || product1}
                                    alt="img"
                                    className="tabproductmain-defult-img tv-img-responsive img-fluid"
                                  />
                                  <img
                                    src={element?.avatar[1] || product1}
                                    alt="img"
                                    className="tabproductmain-hover-img tv-img-responsive img-fluid"
                                  />
                                </div>
                                <ul className="tabproductmain-flags tabproductmain-online-new-wrapper">
                                  <li className="product-flag new">New product</li>
                                </ul>
                                <ul className="tabproductmain-flags tabproductmain-sale-pack-wrapper">
                                  <li className="product-flag on-sale">On Sale!</li>
                                </ul>
                                {element.isAvailable && <Timer />}
                                <div className="tabproductmain-hover-btn">
                                  {/* <div className="tabproductmain-quick-btn">
                                  <img
                                    alt="png"
                                    src={view}
                                    className="img-fluid"
                                    onClick={() => openProductModal(element)}
                                  />
                                </div> */}
                                  <div className="tabproductmain-cart-btn">
                                    <div className="btn add-to-cart tabproductmain-add-to-cart">
                                      <img
                                        alt="png"
                                        src={cart}
                                        className="img-fluid"
                                      // onClick={() => addToCart(element._id)}
                                      />
                                    </div>
                                  </div>
                                  {/* <div className="tvcompare-wrapper product_id_7">
                                  <div className="tabproductmain-compare tvcmsproduct-compare-btn tabproductmain-compare-icon">
                                    <img
                                      alt="png"
                                      src={compare}
                                      className="img-fluid"
                                      onClick={() => addtoCompare(element?.productDetail?.product?._id)}
                                    />
                                  </div>
                                </div> */}
                                  {/* <div className="tabproductmain-wishlist">
                                  <Link to="/wishlist">
                                    <img alt="png" src={wishlist} className="img-fluid" />
                                  </Link>
                                </div> */}
                                </div>
                              </div>
                              <div
                                className="tabproductmain-info-box-wrapper"
                                onClick={() => handleProductClick(element._id)}
                              >
                                <div className="product-description">
                                  <div className="tvall-product-star-icon">
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                    <FontAwesomeIcon icon={faStar} />
                                  </div>
                                  <h6 className="name">{element.title}</h6>
                                </div>
                                <div className="tv-product-price tabproductmain-name-price-wrapper">
                                  <div className="product-price-and-shipping">
                                    <span className="price">${element.withDiscount}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    }) : <p className='ps-3'>no products yet</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Vendor