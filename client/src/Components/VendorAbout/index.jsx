import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import vendorabout from '../../assets/Images/Blog 2.png'

const VendorAbout = () => {
  return (
    <>
      <div className="row align-items-center vender-about">
        <div className="col-lg-6 col-md-12">
          <div className="vendor-about-content">
            <h4>Create a Store</h4>
            <h2>Build your online store on Wolmart</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Venenatis tellus in metus vulputate eu scelerisque felis.</p>
            <Link to='/about-us'><button>Learn more</button></Link>
          </div>
        </div>
        <div className="col-lg-6 col-md-12">
          <div className="vendor-about-img">
            <img src={vendorabout} alt="img" className='img-fluid' />
          </div>
        </div>
      </div>
    </>
  )
}

export default VendorAbout
