import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import ViewModal from '../../pages/Categories/ViewModal';

const OrderReturns = ({ item }) => {
  const navigate = useNavigate()
  const [modalShow, setModalShow] = useState(false);

  const addToWishlist = (id) => {
    let localProducts = JSON.parse(localStorage.getItem('wishlist'))
    let arr = [];
    let selectedProducts = localProducts.filter((product) => product.id !== item.productId._id)
    if (selectedProducts?.length) {
      selectedProducts.push({
        ...item.productId,
        id: item.productId._id,
      })
      arr = [...selectedProducts]
    } else {
      arr.push({
        ...item.productId,
        id: item.productId._id,
      });
    }
    localStorage.setItem('wishlist', JSON.stringify(arr))
    navigate(`/wishlist-reffered/${id}`)
  };

  const closeModal = () => setModalShow(false);

  return (
    <>
      <ViewModal product={item.productId} show={modalShow} onHide={closeModal} />
      <div className="d-flex align-items-center return-policy-item">
        <div className="pe-4 text-center">
          <img src={item?.productId?.image[0]} alt='img' />
          <p>{item?.productId?.title}</p>
        </div>
        <div className="pe-4">
          <p>11 hr 37 min</p>
          <p>Unabridged</p>
        </div>
        <div className="eligible-class">
          <div>
            <FontAwesomeIcon icon={faHome} />
            <p>Eligible</p>
          </div>
        </div>
      </div>
      <div className="mt-3 my-4">
        <button className="return-btn me-2" onClick={() => setModalShow(true)}>
          {item?.productId?.withDiscount}
          <del className="ps-2 pe-2">{item?.productId?.originalPrice}</del>
          <span>{item?.productId?.title}</span>
        </button>
        <button className="me-2 resume-btn">Resume</button>
        <button className="add-wishlist" onClick={() => addToWishlist(item?.productId?._id)}>Add To Wishlist</button>
      </div>
    </>
  )
}

export default OrderReturns