import React from "react";
import pro1 from '../../assets/Images/Products/1.jpg'
import {  useNavigate } from "react-router-dom";

function TrendProducts({ item }) {
  const navigate = useNavigate()
  const { id, image, originalPrice, withDiscount, title } = item;
  const handleClick = () => {
    navigate(`/products/${id}`)
  }
  return (
    <div className="category-spaecialtrend" onClick={() => handleClick()}>
      <div className="main-category-spacialimg">
        <div className="category-sider-img">
          <div className="selling-main-img-box">
            <img
              src={image[0]}
              className="img-fluid selling-img1"
              alt="jpg"
            />
            <img src={image[1] || pro1} alt="img" className="selling-img2" />
          </div>
        </div>
      </div>
      <div className="category-sider-content">
        <p>{title}</p>
        <div>
          <span className="category-price me-2"> ${originalPrice}</span>
          <del> ${withDiscount}</del>
        </div>
      </div>
    </div>
  );
}

export default TrendProducts;
