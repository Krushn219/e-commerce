import React from 'react'
import { Link } from 'react-router-dom'
import ProductSelling from '../../Components/ProductSelling'
import VendorAbout from '../../Components/VendorAbout'
import VendorFees from '../../Components/VendorFees'
import './style.css'

const BecomeVendor = () => {
  return (
    <div className=" become-vendor-wrapper">
        <div className="py-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Become a Vendor
              </li>
            </ol>
          </nav>
        </div>
        <div className="become-vendor-main-wrapper">
          <div className="vendor-about-wrapper pt-4">
            <div className="container">
              <VendorAbout />
            </div>
          </div>
          <div className="product-selling-wrapper">
            <ProductSelling />
          </div>
          <div className="product-fees-wrapper">
            <VendorFees />
          </div>
        </div>
    </div>
  )
}

export default BecomeVendor
