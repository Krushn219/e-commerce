import React from "react";
import BestSellersSingle from "../BestSellerSingle";


const BestSeller = ({ bestsellerProducts }) => {
  return (
    <div className="seller-box-wrapper">
      <div className="seller-box">
        <div>
          <h4>BEST SELLERS</h4>
        </div>
        {bestsellerProducts?.length ? (
          bestsellerProducts.map((item, i) => {
            if (i < 4) {
              return <BestSellersSingle key={i} item={item} />;
            } else {
              return "";
            }
          })
        ) : (
          <p className="ps-3 m-2">No product</p>
        )}
        {bestsellerProducts.length > 1 && <div className="view-product">
          <p>View All Products </p>
        </div>}
      </div>
    </div>
  );
}

export default BestSeller;
