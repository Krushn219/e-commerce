import React from "react";
import './style.css'
import { useNavigate } from "react-router-dom";
import pro1 from '../../assets/Images/Products/1.jpg'

const BestSellersSingle = ({ item }) => {

  const { id, image, withDiscount, originalPrice, title } = item;
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="d-flex selling-img align-items-center" onClick={() => handleProductClick()}>
      <div className="selling-main-img-box">
        <img src={image[0] || pro1} className="img-fluid selling-img1" alt="jpg" />
        <img src={image[1] || pro1} alt="img" className="selling-img2" />
      </div>
      <div className="selling-content">
        <p>{title}</p>
        <div>
          <span> ${withDiscount} </span>
          <del> ${originalPrice} </del>
        </div>
      </div>
    </div>
  );
}

export default BestSellersSingle;
