import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import pro1 from "../../assets/Images/Products/3.jpg";
import ViewModal from '../../pages/Categories/ViewModal';

const WishlistProductall = ({ element, addToCart, handleDelete, changeWishlistQuantity }) => {
  const [modalShow, setModalShow] = useState(false);
  const closeModal = () => setModalShow(false);

  return (
    <>
      <ViewModal product={element} show={modalShow} onHide={closeModal} />
      <div
        key={element.id}
        className="col-lg-4 col-md-6 col-sm-6"
      >
        <div className="wishlist-pro-item main-wishlist-pro">
          <div className="text-end">
            <FontAwesomeIcon icon={faClose} onClick={() => handleDelete(element._id)} />
          </div>
          <div className="wishlist-pro-img py-2">
            <img
              src={element?.directlink[0]?.product?.image[0] || pro1}
              className="img-fluid"
              alt="img"
            />
          </div>
          <div className="wishlist-pro-info">
            <h4>{element.name}</h4>
            <div className="quantity">
              <label>Quantity :</label>
              <input
                type="text"
                value={element.quantities}
                onChange={(e) =>
                  changeWishlistQuantity(e.target.value)
                }
              />
            </div>
            <div className="quantity-wishlist-reffered mt-3">
              <label>Priority:</label>
              <span>{element.directlink[0].priority || "not added priority"}</span>
            </div>
            <div className="mt-3">
              <button className="back-account ms-0 mb-0">
                <span onClick={addToCart}>Add To cart</span>
              </button>
              <button className="back-account wishlist-view-main mb-0">
                <span onClick={() => setModalShow(true)}>view</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default WishlistProductall