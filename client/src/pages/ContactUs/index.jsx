import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot, faPhone, faBandage, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { postCreatecontact } from '../../Utils/APIs'
import { toast } from 'react-toastify'

const ContactUs = () => {
  const [value, setvalue] = useState({
    name: '',
    email: '',
    enquiry: ''
  })

  const EnquirycontactAPI = async () => {
    if (validate(value.name, value.email, value.enquiry)) {
      try {
        const data = {
          name: value.name,
          email: value.email,
          enquiry: value.enquiry
        };
        const res = await postCreatecontact(data);
        if (res.status === 201) {
          toast.info("New Enquiry added")
        }
        else {
          toast.error("Enquiry not added")
        }
        setvalue(data)
      } catch (e) {
        toast.error("User Already Exist. Please Login")
      }
    }
  };

  const validate = () => {
    const { name, email, enquiry } = value
    if (!name & !email & !enquiry) {
      toast.error("Please fill up all the fields")
      return false;
    }

    if (!name) {
      toast.error("Please enter your name")
      return false;
    }

    if (!email) {
      toast.error("Please enter your email")
      return false;
    }

    if (!enquiry) {
      toast.error("Please enter enquiry")
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
    <div className='contact-us-wrapper'>
      <div className='container'>
        <div className='pt-3'>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
            </ol>
          </nav>
        </div>
        <div className='contact-us-main-wrapper'>
          <div className='contact-us-wrapper2'>
            <div className='store-info-title'>
              <h4>Store Information</h4>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className='location location-border'>
                  <div className='main-svg-contact-location'>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div className='contact-location'>
                    <p>Electronic Store <br />
                      123 Main Street, CA 1234 - USA. <br />
                      United States</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className='location location-phone'>
                  <div className='main-svg-contact-location'>
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className='contact-call-info'>
                    <p>Call us:</p>
                    <p className='contact-mail'>+00 123 456 789</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className='location location-border'>
                  <div className='main-svg-contact-location'>
                    <FontAwesomeIcon icon={faBandage} />
                  </div>
                  <div className='contact-call-info'>
                    <p>Fax:</p>
                    <p className='contact-mail'>+00 823 406 789</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                <div className='location contact-email-subscription'>
                  <div className='main-svg-contact-location'>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className='contact-call-info'>
                    <p>Email us:</p>
                    <p className='contact-mail'>demo@demo.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-us-wrapper2 mt-4 px-3">
            <div className='store-info-title'>
              <h4>Contact Us</h4>
            </div>
            <div>
              <div className='main-contact-detail-item px-3'>
                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className='social-title user-name contact-main-title'>
                      <label>Name</label>
                      <input
                        type="text"
                        name='name'
                        placeholder="Add name"
                        onChange={onChangeHandler}
                        value={value.name} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className='social-title user-name contact-main-title'>
                      <label>Email Address</label>
                      <input
                        type="email"
                        name='email'
                        placeholder="Add Email Address"
                        onChange={onChangeHandler}
                        value={value.email} />
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    <div className='social-title user-name contact-main-title'>
                      <label>Enquiry</label>
                      <textarea
                        type="text"
                        name='enquiry'
                        placeholder="Add Enquiry"
                        onChange={onChangeHandler}
                        value={value.enquiry} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-end'>
              <button className='back-account ms-0 mt-4 mx-2' onClick={EnquirycontactAPI}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs