import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import product1 from '../../assets/Images/Products/1.jpg'
import wishlist from "../../assets/Images/Product wishlist.png";
import compare from "../../assets/Images/Product Compare.png";
import cart from "../../assets/Images/Product Cart Icon.png";
import view from "../../assets/Images/Product view.png";
import { useNavigate } from 'react-router-dom'
import ViewModal from './ViewModal';
import { postUpdateCart } from '../../Utils/APIs';
import { toast } from 'react-toastify';


const List1 = ({ item }) => {
  const { _id, image, title, detail, originalPrice, inStock } = item;
  const [modalShow, setModalShow] = useState(false);
  const navigate = useNavigate()

  const handleProductClick = () => {
    navigate(`/products/${_id}`);
  }

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

  return (
    <>
      <ViewModal
        product={item}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className='list-main-wrapper main-list'>
        <div className="row align-items-center">
          <div className='col-lg-3 col-md-4 col-sm-12'>
            <div className='list-new-pro-responsive'>
              <div className='list-main-new-pro'>
                <div className='d-flex align-items-center justify-content-between list-new-product'>
                  <div>
                    <p>New Product</p>
                  </div>
                  <div className='list-sale'>
                    <p>on Sale!</p>
                  </div>
                </div>
                <div className='list-sider-imgmain'>
                  <div className="selling-main-img-box" onClick={() => handleProductClick()}>
                    <img
                      src={image?.[0] || product1}
                      className="img-fluid selling-img1"
                      alt="jpg"
                    />
                    <img src={image?.[1] || product1} alt="img" className="img-fluid selling-img2" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-9 col-md-8 col-sm-12'>
            <div className='list-product-item'>
              <h4>{title}</h4>
              <p>{detail}</p>
              <div className="star-icon">
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
                <FontAwesomeIcon icon={faStar} />
              </div>
              <span> ${originalPrice}</span>
              <p className='on-stock-available'>In Stock {inStock} Available Items</p>
              <div>
                <div className='list-icon' onClick={() => setModalShow(true)}>
                  <img src={view} className="img-fluid" alt='icon' />
                </div>
                <div className='list-icon list-icon-cartmain' onClick={addToCart}>
                  <img src={cart} className="img-fluid" alt='icon' />
                </div>
                <div className='list-icon' onClick={() => addtoCompare(item._id)}>
                  <img src={compare} className="img-fluid" alt='icon' />
                </div>
                <div className='list-icon' onClick={() => addToWishlist(item._id)}>
                  <img src={wishlist} className="img-fluid" alt='icon' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default List1;