import React from 'react'
import './style.css'
import vendorselling from '../../assets/Images/Blog 3.png'

const ProductSelling = () => {
  return (
    <>
      <div className='container'>
        <div className="row align-items-center productselling">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="productselling-img">
              <img src={vendorselling} alt="img" className='img-fluid' />
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="productselling-content">
              <h4>How to Trade</h4>
              <h2>Easy 4 steps to manage your products selling</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing sed do eiusmod metus vul tempor incididunt ut labore et dolore magna aliqua. Venen ate.</p>
              <ul className='product-selling-list'>
                <li>Register and List Your Products</li>
                <li>Start Selling Your Products</li>
                <li>Deliver your Products Everywhere</li>
                <li>Get Payments and Increase your Income</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductSelling
