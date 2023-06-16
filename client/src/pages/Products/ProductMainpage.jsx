import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as faStarRegular,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterest,
} from "@fortawesome/free-brands-svg-icons";
import Loader from "../../Components/Loader";
import { postUpdateCart } from "../../Utils/APIs";
import { ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import CarouselSlider from "../common/CarouselSlider";
import ProductCompare from "../../assets/Images/Product Compare.png";
import Productwishlist from "../../assets/Images/Product wishlist.png";

const ProductMainPage = ({ product, isLoading }) => {
  const navigate = useNavigate();
  const [productSize, setProductsize] = React.useState(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
  const {
    id,
    image,
    title,
    withDiscount,
    inStock,
    originalPrice,
    isAvailable,
    rating = 4,
    description,
    category
  } = product;
  const [quantity, setquantity] = useState(1);

  const handleChange = (e) => {
    setquantity(e.target.value);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setquantity(quantity - 1);
    } else {
      toast.error("Quantity should be greater than zero");
    }
  };

  const addToCart = async () => {
    try {
      if (quantity < 1) {
        toast.error("Quantity should be greater than zero");
      } else {
        const res = await postUpdateCart({
          productId: id,
          quantity: quantity,
          size: productSize[0]
        });
        if (res.status === 200) {
          toast.info("Cart Updated");
          navigate(`/cart`);
        } else {
          toast.error("Cart is not updated");
        }
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Internal Server Error");
    }
  };

  const addtoCompare = () => {
    let localProducts = JSON.parse(localStorage.getItem('products'))
    if (localProducts?.length !== 4) {
      let arr = [];
      let selectedProducts = localProducts.filter((product) => product.id !== id)
      if (selectedProducts?.length) {
        selectedProducts.push(product)
        arr = [...selectedProducts]
      } else {
        arr.push(product);
      }
      localStorage.setItem('products', JSON.stringify(arr))
      navigate(`/compare/${id}`);
    } else {
      toast.error("max limit is 4 for compare")
    }
  };

  return (
    <div className="product-main-wrapper">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12 main-product">
          <div className="row">
            <div>
              <div className="product-inner-new-pro">
                <div className="product-main-img">
                  <div className="d-flex justify-content-between product-top-remove">
                    <div className="new-product">
                      <p>New Product</p>
                    </div>
                    <div className="on-sale">
                      <p>on Sale!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="MainDiv" className="product-sub-wrapper">
              {!isLoading && !!image ? (
                <CarouselSlider image={image} />
              ) : (
                <div>
                  <Loader />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12">
          <div className="m-3 product-iphone margin-top-iphone">
            <h4>{title}</h4>
            <div className="d-flex align-items-center review-stars">
              <div className="star-icon">
                {[
                  ...Array(Math.floor(rating) > 5 ? 5 : Math.floor(rating)),
                ].map((e, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} />
                ))}
                {rating % 1 !== 0 && (
                  <FontAwesomeIcon icon={faStarHalfStroke} />
                )}
                {[
                  ...Array(5 - (Math.ceil(rating) > 5 ? 5 : Math.ceil(rating))),
                ].map((e, i) => (
                  <FontAwesomeIcon key={i} icon={faStarRegular} />
                ))}
              </div>
              <p className="product-reviews">REVIEWS</p>
            </div>
            <div className="d-flex align-items-center product-tax">
              <div className="product-price-and-shipping align-items-center">
                <span className="price">${withDiscount}</span>
                {isAvailable && <del className="originalprice-del">${originalPrice}</del>}
              </div>
              <span className="product-tax-label">TAX INCLUDED</span>
            </div>
            <div className="product-page-desc">
              <p>
                {description?.inTheBox?.length
                  ? description?.inTheBox[0]?.content
                  : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum rerum harum commodi quos nihil quas sequi. Iure officiis voluptate laborum?"}
              </p>
            </div>
          </div>
          <div className="product-quantity-wrapper mx-3">
            {category?.maincategory === "6308487d788db724a86348e8" && <div className="product-size product-quantity flex-wrap">
              <div>
                <p>Size :</p>
              </div>
              <div className="product-main-size flex-wrap">
                <div className={productSize.includes("XS") && productSize.length === 1 ? "small-size active" : "small-size"} onClick={() => { setProductsize(["XS"]) }}>XS</div>
                <div className={productSize.includes("S") && productSize.length === 1 ? "small-size active" : "small-size"} onClick={() => { setProductsize(["S"]) }}>S</div>
                <div className={productSize.includes("M") && productSize.length === 1 ? "small-size active" : "small-size"} onClick={() => { setProductsize(["M"]) }}>M</div>
                <div className={productSize.includes("L") && productSize.length === 1 ? "small-size active" : "small-size"} onClick={() => { setProductsize(["L"]) }}>L</div>
                <div className={productSize.includes("XL") && productSize.length === 1 ? "small-size active" : "small-size"} onClick={() => { setProductsize(["XL"]) }}>XL</div>
                <div className={productSize.includes("XXL") && productSize.length === 1 ? "small-size active" : "small-size"} onClick={() => { setProductsize(["XXL"]) }}>XXL</div>
              </div>
            </div>}
            <div className="product-quantity d-flex align-items-center">
              <p>Quantity :</p>
              <div className="d-flex">
                <button onClick={() => decrementQuantity()}>-</button>
                <input type="text" value={quantity} onChange={handleChange} />
                <button onClick={() => setquantity(Number(quantity + 1))}>
                  +
                </button>
              </div>
            </div>
            <div className="wishlist-compare-view-page">
              <button
                type="button"
                onClick={addToCart}
                className="product-cart-btn"
              >
                Add To Cart
              </button>
              <div className="d-flex ">
                <Link to="/wishlist">
                  <div className="wishlist-view">
                    <img
                      alt="png"
                      src={Productwishlist}
                      className="img-fluid"
                    />
                  </div>
                </Link>
                <div className="compare-view" onClick={() => addtoCompare(product.id)}>
                  <img
                    alt="png"
                    src={ProductCompare}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-3 mb-4 row">
            <div className="col-lg-7 col-md-12 col-sm-12">
              <ProgressBar
                variant="info"
                className="available_product"
                now={
                  inStock > 75
                    ? "100"
                    : inStock > 40
                      ? "50"
                      : inStock > 10
                        ? "15"
                        : "5"
                }
              />
              <div className="available-product-item">
                <p>In Stock {inStock} Available Items</p>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="product-social-main">
                <li className="facebook product-facebook">
                  <a href="https://www.facebook.com/" target="blank"><FontAwesomeIcon icon={faFacebookF} /></a>
                </li>
                <li className="twitter product-twitter">
                  <a href="https://twitter.com/i/flow/login" target="blank"><FontAwesomeIcon icon={faTwitter} /></a>
                </li>
                <li className="instagram product-instagram">
                  <a href="https://www.instagram.com/accounts/login/" target="blank"><FontAwesomeIcon icon={faInstagram} /></a>
                </li>
                <li className="pinterestP product-pinterestP">
                  <a href="https://in.pinterest.com/" target="blank"><FontAwesomeIcon icon={faPinterest} /></a>
                </li>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center ms-3">
            {/* <div className="d-flex align-items-center" onClick={() => handleSize()}>
              <div className="me-3 product-share-iconmain">
                <FontAwesomeIcon icon={faShare} />
              </div>
              <span className="product-share pe-3"> Size Guide</span>
            </div> */}
            {/* <div className="d-flex align-items-center">
              <div className="me-3 product-share-iconmain">
                <FontAwesomeIcon icon={faPen} onClick={openWriteReviewModal} />
              </div>
              <span onClick={openWriteReviewModal} className="product-share">
                Write your review
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMainPage;
