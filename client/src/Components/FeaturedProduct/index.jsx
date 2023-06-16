import React from 'react';
import { useNavigate } from 'react-router-dom';
import FeaturedProductSingle from '../FeaturedProductSingle';

const FeaturedProduct = ({ featuredProducts }) => {
  const navigate = useNavigate()

  const featureproductsView = () => {
    navigate(`/viewFeatured-product`)
  }

  return (
    <div className="seller-box-wrapper">
      <div className="seller-box">
        <div>
          <h4>Featured Products</h4>
        </div>
        {featuredProducts?.length ?
          featuredProducts.map((item, i) => {
            if (i < 4) {
              return <FeaturedProductSingle key={i} item={item} />
            } else {
              return ""
            }
          }) : <p className="m-2 ps-3">No product</p>}
        <div className="view-product">
          <p onClick={() => featureproductsView()}>View All Products </p>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProduct;