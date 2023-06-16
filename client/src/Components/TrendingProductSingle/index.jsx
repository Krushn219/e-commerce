import React from "react";
import "./style.css";
import ProductCartIcon from "../../assets/Images/Product Cart Icon.png";
import Productview from "../../assets/Images/Product view.png";
import product1 from "../../assets/Images/Products/1.jpg";
import ProductCompare from "../../assets/Images/Product Compare.png";
import Productwishlist from "../../assets/Images/Product wishlist.png";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import {
  faStar as faStarRegular,
  faStarHalfStroke,
} from "@fortawesome/free-regular-svg-icons";
import ViewModal from "../../pages/Categories/ViewModal";
import { postUpdateCart } from "../../Utils/APIs";
import { toast } from "react-toastify";
import Timer from "../Timer";
import { useState } from "react";

export const TrendingProductSingle = ({ item }) => {
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate();
  const { id, image, title, withDiscount, isAvailable, originalPrice, rating = 4 } = item;

  const addToCart = async (data) => {
    try {
      const res = await postUpdateCart({
        productId: id,
        quantity: data.quantity,
      });
      if (res.status === 200) {
        toast.info("Cart Updated");
        navigate(`/cart`);
      } else {
        toast.error("Cart is not updated");
      }
    }
    catch (e) {
      toast.error('please login to access this resource')
    }
  };

  const handleProductClick = () => {
    navigate(`/products/${id}`);
  };

  const addtoCompare = () => {
    let localProducts = JSON.parse(localStorage.getItem('products'))
    if (localProducts?.length !== 4) {
      let arr = [];
      let selectedProducts = localProducts.filter((product) => product.id !== id)
      if (selectedProducts?.length) {
        selectedProducts.push(item)
        arr = [...selectedProducts]
      } else {
        arr.push(item);
      }
      localStorage.setItem('products', JSON.stringify(arr))
      navigate(`/compare/${id}`);
    } else {
      toast.error("max limit is 4 for compare")
    }
  };

  const addToWishlist = () => {
    let localProducts = JSON.parse(localStorage.getItem('wishlist'))
    let arr = [];
    let selectedProducts = localProducts.filter((product) => product.id !== id)
    if (selectedProducts?.length) {
      selectedProducts.push(item)
      arr = [...selectedProducts]
    } else {
      arr.push(item);
    }
    localStorage.setItem('wishlist', JSON.stringify(arr))
    navigate(`/wishlist-reffered/${id}`)
  };

  const closeModal = () => setModalShow(false);

  return (
    <>
      <ViewModal product={item} show={modalShow} onHide={closeModal} />
      <div className="tab-product-item me-3">
        <div className="thumbnail-container">
          <div className="tabproductmain-wrapper grid">
            <div className="tabproductmain-image">
              <div
                className="thumbnail product-thumbnail"
                onClick={() => handleProductClick()}
              >
                <img
                  src={image[0] || product1}
                  alt="img"
                  className="tabproductmain-defult-img tv-img-responsive img-fluid"
                />
                <img
                  src={image[1] || product1}
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
              {isAvailable && <Timer />}
              <div className="tabproductmain-hover-btn">
                <div className="tabproductmain-quick-btn" onClick={() => setModalShow(true)}>
                  <img
                    alt="png"
                    src={Productview}
                    className="img-fluid"
                  />
                </div>
                <div className="tabproductmain-cart-btn">
                  <div className="btn add-to-cart tabproductmain-add-to-cart" onClick={() => addToCart(id)}>
                    <img
                      alt="png"
                      src={ProductCartIcon}
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="tvcompare-wrapper product_id_7">
                  <div className="tabproductmain-compare tvcmsproduct-compare-btn tabproductmain-compare-icon" onClick={() => addtoCompare(item._id)}>
                    <img
                      alt="png"
                      src={ProductCompare}
                      className="img-fluid"
                    />
                  </div>
                </div>
                <div className="tabproductmain-wishlist" onClick={() => addToWishlist(item._id)}>
                  <img
                    alt="png"
                    src={Productwishlist}
                    className="img-fluid"
                  />
                </div>
              </div>
            </div>
            <div
              className="tabproductmain-info-box-wrapper"
              onClick={() => handleProductClick(item._id)}
            >
              <div className="product-description">
                <div className="tvall-product-star-icon">
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
                      ...Array(
                        5 - (Math.ceil(rating) > 5 ? 5 : Math.ceil(rating))
                      ),
                    ].map((e, i) => (
                      <FontAwesomeIcon key={i} icon={faStarRegular} />
                    ))}
                  </div>
                </div>
                <h6 className="name">{title}</h6>
              </div>
              <div className="tv-product-price tabproductmain-name-price-wrapper">
                <div className="product-price-and-shipping align-items-center">
                  <span className="price">${withDiscount}</span>
                  {isAvailable && <del className="originalprice-del">${originalPrice}</del>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TrendingProductSingle;
