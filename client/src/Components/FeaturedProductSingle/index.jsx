import React from 'react';
import pro1 from '../../assets/Images/Products/1.jpg'
import { useNavigate } from 'react-router-dom';

function FeaturedProductSingle({item}) {
  const { id, image, originalPrice, withDiscount, title } = item;

  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/products/${id}`);
  };
  return (
    <div className="d-flex selling-img align-items-center" onClick={() => handleProductClick()}>
      <div className="selling-main-img-box">
        <img
          src={image[0]}
          className="img-fluid selling-img1"
          alt="jpg"
        />
        <img src={image[1] || pro1} alt="img" className="selling-img2" />
      </div>
      <div className="selling-content">
        <p>{title}</p>
        <div>
          <span> ${originalPrice}</span>
          <del> ${withDiscount}</del>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProductSingle;