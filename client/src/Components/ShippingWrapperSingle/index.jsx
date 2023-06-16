import React from "react";

function ShippingWrapperSingle({ item }) {
  const { img, text, p } = item;
  return (
    <div>
      <div className="d-flex shipping-imgmain align-items-center">
        <div className="shipping-img">
          <img src={img} className="img-fluid" alt="png" />
        </div>
        <div className="selling-content">
          <h4>{text}</h4>
          <p>{p}</p>
        </div>
      </div>
    </div>
  );
}

export default ShippingWrapperSingle;
