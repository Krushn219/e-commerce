import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faPhone, faStar, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons'
import logovendor from '../../assets/Images/logovendor.jpg'
import { useNavigate } from 'react-router-dom'
import vendor5 from '../../assets/Images/vendor1.jpg'

const StoreList1 = ({ storelist, search }) => {
  const navigate = useNavigate()
  const { rating = 4 } = storelist;

  const GoToVendor = (id) => {
    navigate(`/vendor/${id}`)
  }

  return (
    <>
      {storelist?.length ? storelist
        .filter(
          (item) =>
            item.firstname.toLowerCase().includes(search) || 
            item.lastname.toLowerCase().includes(search)
        )
        .map((element) => {
          return <div className="col-lg-4 col-md-6 col-sm-12" key={element._id}>
            <div className='store-wrap mb-4'>
              <div className='store store-grid'>
                <div className='store-header'>
                  <div className='store-banner'>
                    <img src={vendor5} className='img-fluid' alt='img' />
                  </div>
                  <div className='store-content'>
                    <h4 className='store-title pb-0'>
                      <span>{element.firstname} {element.lastname}</span>
                      <label className='featured-label'>isfeatured</label>
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
                      {[...Array((Math.floor(rating) > 5 ? 5 : Math.floor(rating)))].map((e, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
                      {rating % 1 !== 0 && <FontAwesomeIcon icon={faStarHalfStroke} />}
                      {[...Array(5 - (Math.ceil(rating) > 5 ? 5 : Math.ceil(rating)))].map((e, i) => <FontAwesomeIcon key={i} icon={faStar} />)}
                    </div>
                    <div className='store-address pb-2'>
                      {element?.customer_support?.address_1}
                      {element?.customer_support?.address_2} <br />
                      {element?.customer_support?.city} , {element?.customer_support?.state} , {element?.customer_support?.postcode_zip}
                    </div>
                    <ul className='seller-info-list list-style-none'>
                      <li className='store-phone'>
                        <FontAwesomeIcon icon={faPhone} className='pe-2' />
                        <span>{element.Phone}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="store-footer">
                    <div className="seller-brand">
                      <img src={logovendor} alt="img" />
                    </div>
                    <div className='d-flex align-items-center'>
                      <div className='btn btn-dark btn-link btn-icon-right btn-visit' onClick={() => GoToVendor(element._id)}>Visit Store</div>
                      <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }) : <p>not vendor yet</p>}
    </>
  )
}

export default StoreList1
