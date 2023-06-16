import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as faStarRegular, faStarHalfStroke  } from '@fortawesome/free-regular-svg-icons'
import { ISOTodate } from '../../Utils/utilFunctions';

const ProductReviews = ({ item }) => {
  const { user, createdAt, reviewTitle, reviewDescription, rating } = item;
  return (
    <div className="col-lg-6 col-sm-12">
      <div className="product-review-item">
        <div className="product-review">
          <div className="d-flex justify-content-between">
            <h4 className="mb-0">{`${user?.firstname || "firstName "} `  + user?.lastname || "lastName"}</h4>
            <div className='d-flex'>
              <div className="star-icon">
                {[...Array((Math.floor(rating) > 5 ? 5 : Math.floor(rating)))].map((e, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
                {rating % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfStroke} />}
                {[...Array(5-(Math.ceil(rating) > 5 ? 5 : Math.ceil(rating)))].map((e, i) => <FontAwesomeIcon key={i} icon={faStarRegular} />)}
              </div>
            </div>
          </div>
          <div className="product-date">{ISOTodate(createdAt)}</div>
        </div>
        <div className="product-review-main">
          <h4 className="mb-0">{reviewTitle}</h4>
          <div>{reviewDescription}</div>
        </div>  
      </div>
    </div>
  );
}

export default ProductReviews;