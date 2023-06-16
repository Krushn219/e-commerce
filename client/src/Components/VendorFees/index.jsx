import React from 'react'
import './style.css'

const VendorFees = () => {
  return (
    <>
      <div className='container'>
        <div className="vendor-fees-wrapper text-center">
          <h4>Only Few Fees</h4>
          <h2>All is secured and Transparent </h2>
          <p>Nunc id cursus metus aliquam. Libero id faucibus nisl tincidunt eget.</p>
          <div className="row align-items-center vendor-fees-info">
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <h3>$0</h3>
              <h5>Listing Fee</h5>
              <p>Diam maecenas ultricies mi eget mauris <br /> Nibh tellus molestie nunc non</p>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-12'>
              <h3>5%</h3>
              <h5>Final Value Fee</h5>
              <p>Diam maecenas ultricies mi eget mauris <br /> Nibh tellus molestie nunc non</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VendorFees