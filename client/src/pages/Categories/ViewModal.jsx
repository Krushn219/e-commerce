import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeFork, faHeartCirclePlus, faStar } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import {
  faShare,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faPinterest,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Modal, ProgressBar } from "react-bootstrap";
import { toast } from "react-toastify";
import { postUpdateCart } from "../../Utils/APIs";
import CarouselSlider from "../common/CarouselSlider";

const ViewModal = (props) => {
  const { id, title, image, withDiscount, inStock, name, originalPrice, isAvailable, category } = props.product;
  const [productSize, setProductsize] = useState(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
  const [isSize, setisSize] = useState(false);
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

  const navigate = useNavigate();

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
      toast.error(e?.response.data.message || "Internal server error");
    }
  };

  const handleSize = () => {
    if (!isSize) {
      setisSize(true)
    } else {
      setisSize(false)
    }
  }

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        size="lg"
        className="mt-4 category-view-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="d-flex justify-content-between">
              <div>View Product</div>
              <div>
                <FontAwesomeIcon
                  icon={faClose}
                  className="close-btn"
                  onClick={props.onHide}
                />
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="product-main-wrapper">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12 main-product">
                <div className="row m-0">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="product-inner-new-pro">
                      <div className="product-main-img">
                        <div className="d-flex justify-content-between product-top-remove">
                          <div className="new-product">
                            <p>New Product</p>
                          </div>
                          <div>
                            <p className="on-sale">on Sale!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    id="MainDiv"
                    className="col-lg-12 col-md-12 col-sm-12 col-12 product-sub-wrapper"
                  >
                    {image?.length ? (
                      <CarouselSlider image={image} />
                    ) : (
                      <p>No Image Found</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-6 col-md-12 col-sm-12">
                <div className="m-3 product-iphone">
                  <h4>{title || name}</h4>
                  <div className="d-flex align-items-center review-stars">
                    <div className="star-icon">
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                      <FontAwesomeIcon icon={faStar} />
                    </div>
                    <p className="product-reviews">REVIEWS </p>
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
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Ducimus quibusdam repellat necessitatibus. Vero labore
                      inventore totam, quisquam perferendis voluptatum
                      doloribus?
                    </p>
                  </div>
                </div>
                <div className="product-quantity-wrapper mx-3">
                  {category?.maincategory === "6308487d788db724a86348e8" && isSize && <div className="product-size product-quantity flex-wrap">
                    <div>
                      <p>SIZE :</p>
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
                      type="submit"
                      onClick={() => addToCart()}
                      className="product-cart-btn"
                    >
                      Add To Cart
                    </button>
                    <div className="d-flex ">
                      <Link to="/wishlist">
                        <div className="wishlist-view pe-3">
                          <FontAwesomeIcon icon={faHeartCirclePlus} />
                        </div>
                      </Link>
                      <div className="compare-view">
                        <FontAwesomeIcon icon={faCodeFork} />
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
                    <div className="d-flex align-items-center" onClick={() => handleSize()}>
                      <div className="me-3">
                        <FontAwesomeIcon icon={faShare} />
                      </div>
                      <span className="product-share pe-3"> Size Guide</span>
                    </div>
                    {/* <div className="d-flex align-items-center">
                    <div className="me-3">
                      <FontAwesomeIcon icon={faPen} />
                    </div>
                    <span className="product-share">Write your review</span>
                  </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewModal;
