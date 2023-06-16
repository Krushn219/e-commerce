import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import product1 from "../../assets/Images/img.jpg";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { getWishlist } from "../../Utils/APIs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const WishlistProducts = ({ item, element }) => {
  const navigate = useNavigate()
  const [wishlist, setwishlist] = useState([]);
  const [quantity, setquantity] = useState();

  useEffect(() => {
    getWishListAPI()
  }, []);

  const changeWishlistQuantity = (e) => {
    setquantity(e.target.value);
  };

  const getWishListAPI = async () => {
    try {
      const res = await getWishlist();
      setwishlist(res.data.userWishlist);
    } catch (error) {
      toast(error);
    }
  }

  const goToWishlistRiffered = (id) => {
    let localProducts = JSON.parse(localStorage.getItem('wishlist'))
    let arr = [];
    if (localProducts?.length) {
      localProducts.push(item)
      arr = [...localProducts]
    } else {
      arr.push(item);
    }
    localStorage.setItem('wishlist', JSON.stringify(arr))
    navigate(`/wishlist-reffered/${id}`)
  }

  return (
    <>
      <div className="wishlist-pro-item">
        <div className="wishlist-pro-img mb-4">
          <img
            src={element?.directlink[0]?.product?.image[0] || product1}
            className="img-fluid"
            alt="img"
          />
          <FontAwesomeIcon icon={faClose} className='mt-3 mx-3' />
        </div>
        <div className="wishlist-pro-info">
          <h4>{element?.directlink[0]?.product?.title || element.name}</h4>
          <div className="quantity">
            <label>Quantity :</label>
            <input
              type="number"
              value={element.quantities}
              onChange={(e) => changeWishlistQuantity(e.target.value)}
            />
          </div>
          <div className="quantity mt-3">
            <label>Priority :</label>
            <input
              type="priority"
              value={element.directlink[0].priority}
              onChange={(e) => changeWishlistQuantity(e.target.value)}
            />
            {/* <select>
                      {options?.map((item) => {
                        return (
                          <option key={item} value={item.priority}>
                            {item}
                          </option>
                        );
                      })}
                    </select> */}
          </div>
          <div className="mt-3">
            <button className="back-account ms-0 mb-2">
              <span onClick={() => goToWishlistRiffered(element?.directlink[0]?._id)}>Save</span>
            </button>
            <button className="back-account mb-2">
              <span>Move</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistProducts;
