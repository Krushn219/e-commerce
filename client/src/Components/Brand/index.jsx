import React from 'react'
import './style.css'
import { brandimg, brandSlider } from './utils'
import Slider from "react-slick";

const Brand = () => {
  return (
    <div className="brand-wrapper">
      <div className="container">
        <div className="brand-img">
          <div className="row">
            <Slider {...brandSlider}>
              {brandimg.length ? brandimg.map((item) => {
                return <div key={item.id} className='brand-item'>
                  <div className='brand-logomain'>
                    <img src={item.img} alt="img" className='img-fluid' />
                  </div>
                </div>
              }) : <p>no brands yet</p>}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Brand