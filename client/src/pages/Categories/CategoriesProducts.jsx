import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import product1 from "../../assets/Images/Products/1.jpg";
import wishlist from "../../assets/Images/Product wishlist.png";
import compare from "../../assets/Images/Product Compare.png";
import cart from "../../assets/Images/Product Cart Icon.png";
import view from "../../assets/Images/Product view.png";
import { useNavigate } from "react-router-dom";
import ViewModal from "./ViewModal";
import { postUpdateCart } from "../../Utils/APIs";
import { toast } from "react-toastify";
import Timer from "../../Components/Timer";

const CategoriesProducts = ({ item }) => {
  const [modalShow, setModalShow] = useState(false);
  const closeModal = () => setModalShow(false);

  const { _id, image, title, withDiscount, isAvailable } = item;
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${_id}`);
  };

  const addToWishlist = () => {
    let localProducts = JSON.parse(localStorage.getItem('wishlist'))
    let arr = [];
    let selectedProducts = localProducts.filter((product) => product.id !== item._id)
    if (selectedProducts?.length) {
      selectedProducts.push({
        ...item,
        id: item._id,
      })
      arr = [...selectedProducts]
    } else {
      arr.push({
        ...item,
        id: item._id,
      });
    }
    localStorage.setItem('wishlist', JSON.stringify(arr))
    navigate(`/wishlist-reffered/${_id}`)
  };

  const addtoCompare = () => {
    let localProducts = JSON.parse(localStorage.getItem('products'))
    if (localProducts?.length !== 4) {
      let arr = [];
      let selectedProducts = localProducts.filter((product) => product.id !== _id)
      if (selectedProducts?.length) {
        selectedProducts.push(item)
        arr = [...selectedProducts]
      } else {
        arr.push(item);
      }
      localStorage.setItem('products', JSON.stringify(arr))
      navigate(`/compare/${_id}`);
    } else {
      toast.error("max limit is 4 for compare")
    }
  };

  const addToCart = async (data) => {
    const res = await postUpdateCart({
      productId: _id,
      quantity: data.quantity,
    });
    if (res.status === 200) {
      toast.info("Cart Updated");
      navigate(`/cart`);
    } else {
      toast.error("Cart is not updated");
    }
  };

  return (
    <>
      <ViewModal product={item} show={modalShow} onHide={closeModal} />
      <div className="col-lg-3 col-md-4 col-sm-6 small-size-main col-sml-100">
        <div className="product-itemmain me-3">
          <div className="thumbnail-container">
            <div className="tabproductmain-wrapper grid">
              <div className="tabproductmain-image">
                <div
                  className="thumbnail product-thumbnail"
                  onClick={() => handleProductClick()}
                >
                  <img
                    src={image?.[0] || product1}
                    alt="img"
                    className="tabproductmain-defult-img tv-img-responsive img-fluid"
                  />
                  <img
                    src={image?.[1] || product1}
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
                      src={view}
                      className="img-fluid"
                    />
                  </div>
                  <div className="tabproductmain-cart-btn">
                    <div className="btn add-to-cart tabproductmain-add-to-cart" onClick={addToCart}>
                      <img
                        alt="png"
                        src={cart}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="tvcompare-wrapper product_id_7">
                    <div className="tabproductmain-compare tvcmsproduct-compare-btn tabproductmain-compare-icon" onClick={() => addtoCompare(item._id)}>
                      <img
                        alt="png"
                        src={compare}
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="tabproductmain-wishlist" onClick={() => addToWishlist(item._id)}>
                    <img alt="png" src={wishlist} className="img-fluid" />
                  </div>
                </div>
              </div>
              <div
                className="tabproductmain-info-box-wrapper"
                onClick={() => handleProductClick()}
              >
                <div className="product-description">
                  <div className="tvall-product-star-icon">
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                  </div>
                  <h6 className="name">{title}</h6>
                </div>
                <div className="tv-product-price tabproductmain-name-price-wrapper">
                  <div className="product-price-and-shipping">
                    <span className="price">${withDiscount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesProducts;
