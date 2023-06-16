import React from 'react'
import './style.css'
import { Accordion } from 'react-bootstrap';
import BestSeller from '../BestSeller';
import FeaturedProduct from '../FeaturedProduct';
import ShippingWrapperSingle from '../ShippingWrapperSingle';

const SidebarAccordion = ({ support, bestsellerProducts, featuredProducts }) => {
  return (
    <div className='sidebar-accordion-wrapper'>
      <Accordion className='main-sidebar-accordion'>
        <Accordion.Item eventKey="1">
          <Accordion.Header>BEST SELLERS</Accordion.Header>
          <Accordion.Body>
            <BestSeller bestsellerProducts={bestsellerProducts} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className='free-shipping-accordion'>
          <Accordion.Header>FREESHIPPING</Accordion.Header>
          <Accordion.Body>
            <div className="shipping-wrapper">
              {support?.length &&
                support.map((item, i) => {
                  return (
                    <ShippingWrapperSingle key={i} item={item} />
                  );
                })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>FEATURED PRODUCT</Accordion.Header>
          <Accordion.Body>
            <FeaturedProduct featuredProducts={featuredProducts} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}

export default SidebarAccordion