import React from 'react';
import './Style.css'
import Payment from '../../assets/Images/demo_img_1 (1).png'
import Accordion from 'react-bootstrap/Accordion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getMainCategory, newsletterSubscribe, postCreatecontact } from '../../Utils/APIs';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { services } from './utils';
import logo from '../../assets/Images/logo2.jpg'
import { useEffect } from 'react';

const Footer = () => {
  const navigate = useNavigate()
  const [categorylist, setcategorylist] = useState()
  const [value, setvalue] = useState({
    email: '',
  })

  const NewslettercontactAPI = async () => {
    if (validate(value.email)) {
      try {
        const data = {
          email: value.email
        };
        const res = await newsletterSubscribe(data);
        if (res.status === 201) {
          toast.info("Newsletter Subscribed Successfully...")
        }
        else {
          toast.error("Newsletter not Subscribed")
        }
        setvalue(data)
      } catch (e) {
        toast.error("User Already Exist. Please Login")
      }
    }
  };

  useEffect(() => {
    CategoryAPI()
  }, [])

  const CategoryAPI = async () => {
    try {
      const res = await getMainCategory()
      setcategorylist(res.data.mainCategories)
    } catch (error) {
      toast(error)
    }
  }

  const goTocategory = (maincategoryid) => {
    navigate(`/category/${maincategoryid}`)
  }

  const validate = () => {
    const { email } = value
    if (!email) {
      toast.error("Please enter your email")
      return false;
    }
    return true;
  }

  const onChangeHandler = (e) => {
    setvalue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
      <footer className="footer-wrapper footer navbar-fixed-bottom">
        <div className="services-wrapper-main">
          <div className="container">
            <div className="row">
              {services.length ? services.map((item) => {
                return <div className="col-lg-3 col-md-6 col-sm-12" key={item.id}>
                  <div className="services-info">
                    <img src={item.image} alt="img" className='img-fluid' />
                    <h4>{item.title}</h4>
                    <p>{item.discription}</p>
                  </div>
                </div>
              }) : <p>no services yet</p>}
            </div>
          </div>
        </div>
        <div className="footer-logo-wrapper">
          <div className="container">
            <div className="footer-logomain text-center">
              <img src={logo} alt="img" className='img-fluid' />
              <p>We are a global housewares product design company. We bring thought and creativity to everyday items through original design.</p>
            </div>
          </div>
        </div>
        <div className="footer-inner-wrapper-main">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-12">
                <div className="footer-wrapper-content footer-wrapper-main">
                  <div className="linklist">
                    <h4>Contact Details</h4>
                    <div className="contact-info">
                      <div className="d-flex contact-icon">
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} className='me-2' />
                        </div>
                        <div>
                          <p>Electronic Store <br />
                            123 Main Street, CA 1234 - USA. <br />
                            United States</p>
                        </div>
                      </div>
                      <div className="d-flex contact-icon">
                        <div>
                          <FontAwesomeIcon icon={faEnvelope} className='me-2' />
                        </div>
                        <div>
                          <p>demo@demo.com</p>
                        </div>
                      </div>
                      <div className="d-flex contact-icon">
                        <div>
                          <FontAwesomeIcon icon={faPhone} className='me-2' />
                        </div>
                        <div>
                          <a href="tel:+(055) 888 8888">+(055) 888 8888</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-xl-2 col-lg-2 col-md-12'>
                <div className="footer-category-list">
                  <h4>Category</h4>
                  <div className='footer-cat-title'>
                    {categorylist?.length && categorylist?.map((element, i) => {
                      return <p key={i} onClick={() => goTocategory(element?._id)}>{element.name}</p>
                    })}
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-12">
                <div className="footer-wrapper-content">
                  <div className="linklist">
                    <h4>Our Company</h4>
                    <ul>
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/about-us">About Us</Link>
                      </li>
                      <li>
                        <Link to="/categories">Categories</Link>
                      </li>
                      <li>
                        <Link to="/blogs">Blog</Link>
                      </li>
                      <li>
                        <Link to="/contact-us">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-12">
                <div className="footer-wrapper-content footer-wrapper-main">
                  <div className="linklist">
                    <h4>Your Account</h4>
                    <ul>
                      <Link to='/my-account'><li>My Account</li></Link>
                      <Link to='/online-support'><li>Online Support</li></Link>
                      <Link to='/shipping-policy'><li>Shipping Policy</li></Link>
                      <Link to='/return-policy'><li>Return Policy</li></Link>
                      <Link to='/privacy-policy'><li>Privacy Policy</li></Link>
                      <Link to='/terms-condition'><li>Terms And Condition</li></Link>
                      <li>Personal info</li>
                      <li>My alerts</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-12">
                <div>
                  <div className="linklist newsletter">
                    <h4>Newsletter</h4>
                    <div className="email-subscription">
                      <p>You will be notified when somthing new will be appear.</p>
                      <input
                        type="email"
                        name='email'
                        placeholder="Add Email Address"
                        onChange={onChangeHandler}
                        value={value.email}
                        className='my-3' />
                      <button className="subscribe-btn" onClick={NewslettercontactAPI}>Subscribe</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <Accordion className='accordion-footer'>
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div className="linklist">
              <h4>Contact Details</h4>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="contact-info">
              <div className="d-flex contact-icon">
                <div>
                  <FontAwesomeIcon icon={faLocationDot} className='me-2' />
                </div>
                <div>
                  <p>Electronic Store <br />
                    123 Main Street, CA 1234 - USA. <br />
                    United States</p>
                </div>
              </div>
              <div className="d-flex contact-icon">
                <div>
                  <FontAwesomeIcon icon={faEnvelope} className='me-2' />
                </div>
                <div>
                  <p>demo@demo.com</p>
                </div>
              </div>
              <div className="d-flex contact-icon">
                <div>
                  <FontAwesomeIcon icon={faPhone} className='me-2' />
                </div>
                <div>
                  <a href="tel:+(055) 888 8888">+(055) 888 8888</a>
                </div>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <div className="footer-category-list">
              <h4>Category</h4>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className='footer-cat-title'>
              {categorylist?.length && categorylist?.map((element, i) => {
                return <p key={i} onClick={() => goTocategory(element?._id)}>{element.name}</p>
              })}
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <div className="linklist">
              <h4>Our Company</h4>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="footer-wrapper-content">
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <li>
                  <Link to="/categories">Categories</Link>
                </li>
                <li>
                  <Link to="/blogs">Blog</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>
            <div className="linklist">
              <h4>Your Account</h4>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <div className="footer-wrapper-content footer-wrapper-main">
              <ul>
                <Link to='/my-account'><li>My Account</li></Link>
                <Link to='/online-support'><li>Online Support</li></Link>
                <Link to='/shipping-policy'><li>Shipping Policy</li></Link>
                <Link to='/return-policy'><li>Return Policy</li></Link>
                <Link to='/privacy-policy'><li>Privacy Policy</li></Link>
                <Link to='/terms-condition'><li>Terms And Condition</li></Link>
                <li>Personal info</li>
                <li>My alerts</li>
              </ul>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <div className="linklist newsletter">
          <h4>Newsletter</h4>
          <div className="email-subscription">
            <p>You will be notified when somthing new will be appear.</p>
            <input
              type="email"
              name='email'
              placeholder="Add Email Address"
              onChange={onChangeHandler}
              value={value.email}
              className='mb-1' />
            <button className="subscribe-btn" onClick={NewslettercontactAPI}>Subscribe</button>
          </div>
        </div>
      </Accordion>
      <div className="footermain-after-block">
        <div className="container footermain-after-block-inner">
          <div className="row align-items-center footermain-block-copyright">
            <div className="badpaymenticon-block col-lg-4 col-md-12 col-sm-12">
              <div className="badpaymenticon-content-inner">
                <div className="badpaymenticon-item">
                  <Link to="/" title="Demo Title 1">
                    <img src={Payment} alt="png" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="footermain-copyright col-lg-4 col-md-12 col-sm-12">
              <div className="footermain-copyright-content text-center">
                <Link to="/" title="Copyright © 2022 - All Right Reserved PrestaShop™">© 2022 - Ecommerce software by
                  PrestaShop™</Link>
              </div>
            </div>
            <div className="footermain-socialicon-block col-lg-4 col-md-12 col-sm-12">
              <div className="footermain-socialicon-content-wrapper">
                <ul className="footermain-socialicon-content">
                  <li className="facebook">
                    <a href="https://www.facebook.com/" target="blank"><i className="fab fa-facebook-f" /></a>
                  </li>
                  <li className="linkedin linkdin">
                    <a href="https://linkedin.com/your/profile/url" target="blank"><i className="fab fa-linkedin" /></a>
                  </li>
                  <li className="twitter">
                    <a href="https://twitter.com/i/flow/login" target="blank"><i className="fab fa-twitter" /></a>
                  </li>
                  <li className="linkedin instagram">
                    <a href="https://www.instagram.com/accounts/login/" target="blank"><i className="fab fa-instagram" /></a>
                  </li>
                  <li className="linkedin youtube">
                    <a href="https://www.youtube.com" target="blank"><i className="fab fa-youtube" /></a>
                  </li>
                  <li className="linkedin google">
                    <a href="https://www.google.com" target="blank"><i className="fab fa-google" /></a>
                  </li>
                  <li className="linkedin pinterest">
                    <a href="https://in.pinterest.com/" target="blank"><i className="fab fa-pinterest" /></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;