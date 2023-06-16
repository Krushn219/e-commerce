import React from 'react'
import './style.css'
import vendor1 from '../../assets/Images/vendor1.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPhone, faStar } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const StoreList2 = ({ storelist, search }) => {
  const navigate = useNavigate()

  const GoToVendor = (id) => {
    navigate(`/vendor/${id}`)
  }

  return (
    <div className='storelist-second-wrapper'>
      <div className='col-12'>
        {storelist?.length ? storelist
          .filter(
            (item) =>
              item.firstname.toLowerCase().includes(search) ||
              item.lastname.toLowerCase().includes(search)
          )
          .map((element) => {
            return <div className='store store-list mt-4' key={element.id}>
              <div className='store-header d-flex'>
                <div className="row align-items-center">
                  <div className="col-lg-5 col-md-4 col-sm-12">
                    <div className='store-banner store-second-banner'>
                      <img src={vendor1} className='img-fluid' alt='img' onClick={() => GoToVendor(element._id)} />
                      <label className='featured-main-second'>Featured</label>
                      <div className="seller-brand">
                        <img src={vendor1} alt="img" />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-8 col-sm-12">
                    <div className='store-second-content'>
                      <div className='store-content d-block'>
                        <h4 className='store-title'>
                          <span>{element.firstname} {element.lastname}</span>
                        </h4>
                        <div className='ratings-container'>
                          <div className='ratings-full'>
                            <span className='ratings'></span>
                            <span className='tooltiptext tooltip-top'>{element.rating}</span>
                          </div>
                        </div>
                        <div className="star-icon pb-2">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                        </div>
                        <div className='store-address pb-2'>
                          {element?.customer_support?.address_1} {element?.customer_support?.address_2} , {element?.customer_support?.city} , {element?.customer_support?.state} , {element?.customer_support?.postcode_zip}
                        </div>
                        <ul className='seller-info-list list-style-none'>
                          <li className='store-phone'>
                            <FontAwesomeIcon icon={faPhone} className='pe-2' />
                            <span>{element.Phone}</span>
                          </li>
                        </ul>
                        <div className='d-flex align-items-center visit-store-right'>
                          <div className='btn btn-dark btn-link btn-icon-right btn-visit ps-0' onClick={() => GoToVendor(element._id)}>Visit Store</div>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }) : <p>not vendor yet</p>}
      </div>
    </div>
  )
}

export default StoreList2
