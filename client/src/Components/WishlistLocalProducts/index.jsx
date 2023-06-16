import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import pro1 from "../../assets/Images/Products/3.jpg";
import ViewModal from '../../pages/Categories/ViewModal';
import { postUpdateCart } from '../../Utils/APIs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const WishlistLocalProducts = ({ element, handleViewWishlistDelete, changeWishlistQuantity }) => {
  const [modalShow, setModalShow] = useState(false);
  const closeModal = () => setModalShow(false);
  const navigate = useNavigate()

  const addToCart = async (id, data) => {
    try {
      const res = await postUpdateCart({
        productId: id,
        quantity: data?.quantity,
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
  }

  return (
    <>
      <ViewModal product={element} show={modalShow} onHide={closeModal} />
      <div
        key={element.id}
        className="col-lg-4 col-md-6 col-sm-6"
      >
        <div className="wishlist-pro-item main-wishlist-pro">
          <div className="text-end">
            <FontAwesomeIcon icon={faClose} onClick={() => handleViewWishlistDelete(element._id || element.id)} />
          </div>
          <div className="wishlist-pro-img py-2">
            <img
              src={element?.image[0] || pro1}
              className="img-fluid"
              alt="img"
            />
          </div>
          <div className="wishlist-pro-info">
            <h4>{element.title}</h4>
            <div className="quantity">
              <label>Quantity :</label>
              <input
                type="text"
                value={element.inStock || element.countInStock}
                onChange={(e) =>
                  changeWishlistQuantity(e.target.value)
                }
              />
            </div>
            <div className="quantity-wishlist-reffered mt-3">
              <label>Priority:</label>
              <span>{element?.priority || "not added priority"}</span>
            </div>
            <div className="mt-3">
              <button className="back-account ms-0 mb-0">
                <span onClick={() => addToCart(element._id || element.id)}>Add To cart</span>
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

export default WishlistLocalProducts