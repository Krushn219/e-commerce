import React from "react";

const ProductDetail = () => {
  return (
    <>
      {/* PRODUCT-DETAILS  */}
      <div className="product-disc-wrapper">
        <div className="reference d-flex">
          <h4>Data Sheet</h4>
        </div>
        <div className="table-product">
          <table className="table table-bordered table-striped">
            <tbody>
              <tr>
                <td>Compositions</td>
                <td>Basic</td>
              </tr>
              <tr>
                <td>Color</td>
                <td>White</td>
              </tr>
              <tr>
                <td>Size</td>
                <td>720×1280</td>
              </tr>
              <tr>
                <td>Frame Size</td>
                <td>Wool</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
