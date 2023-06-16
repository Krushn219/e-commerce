import React, { useEffect, useState } from 'react'
import './style.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCloudUpload } from '@fortawesome/free-solid-svg-icons'
import { useRef } from 'react'
import { getSingleUser } from '../../Utils/APIs'
import { toast } from 'react-toastify'
import profilePicture from '../../assets/Images/default-store-banner.png'
import { useLocation, useNavigate } from 'react-router-dom'

const Store = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const hiddenFileInput = useRef(null);
  const [User, setUser] = useState({})
  const [file, setfile] = useState()

  const handleClick = (event) => {
    hiddenFileInput.current.click(event.target.value);
  };

  const handleChange = (e) => {
    setfile(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    UserSingleAPI()
  }, []);

  const UserSingleAPI = async () => {
    try {
      const res = await getSingleUser();
      setUser(res.data.user);
    } catch (error) {
      toast.error("please fill all the fields");
    }
  };

  const goToEditAccount = () => {
    navigate(`/edit-account`)
  }

  return (
    <div className='vendor-store-wrapper'>
      <div className="vendore-store-header">
        <h2>Profile → <span>Visit Store</span></h2>
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
      </div>
      <div className='vendore-store-info'>
        <div className="row align-items-center">
          <div className="col-lg-3">
            <label>Profile Picture</label>
          </div>
          <div className="col-lg-9">
            <div className='button-area'>
              {/* {!file && <FontAwesomeIcon icon={faCloudUpload} />} */}
              {!file && <div className='file-img'>
                <img src={User.image} alt='img' />
              </div>}
              {/* <img src={User.image} alt="img" /> */}
              {file && <div className='file-img'>
                <img src={file || profilePicture} alt="img" />
              </div>}
              <button className='filter-product-btn mb-0' onClick={handleClick}>Upload Photo</button>
            </div>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-lg-3">
            <label>Store Name</label>
          </div>
          <div className="col-lg-9">
            <input type="text" value={User.firstname && User.lastname} onChange={(e) => setUser({ ...User, firstname: e.target.value })} placeholder='store name' name='name' />
          </div>
        </div>
        <div className="row py-3">
          <div className="col-lg-3">
            <label>Address :</label>
          </div>
          <div className="col-lg-9">
            <div className='pb-3'>
              <label>Street</label>
              {/* <input type="text" value={"not Added address"} onChange={(e) => setUser({ ...User, address: e.target.value })} placeholder='street address' name='address' /> */}
              <div className='address-complement'>{(User?.address && User?.address[0]?.address) || "not added yet"}</div>
            </div>
            <div className='pb-3'>
              <label>Street 2</label>
              {/* <input type="text" value={"not added address"} onChange={(e) => setUser({ ...User, addressComplement: e.target.value })} placeholder='Apartment, suite, unit etc. (optional)' name='address2' /> */}
              <div className='address-complement'>{(User?.address && User?.address[0]?.addressComplement) || "not added yet"}</div>
            </div>
            <div className="row px-3">
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className='me-3 address-city'>
                  <label>City</label>
                  {/* <input type="text" value={"not added city"} onChange={(e) => setUser({ ...User, city: e.target.value })} placeholder='Town / City' name='city' /> */}
                  <div className='address-complement'>{(User?.address && User?.address[0]?.city) || "not added yet"}</div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <div className='add-state'>
                  <label>State</label>
                  {/* <input type="text" value={"not added state"} onChange={(e) => setUser({ ...User, state: e.target.value })} placeholder='Postcode / Zip' name='state' /> */}
                  <div className='address-complement'>{(User?.address && User?.address[0]?.state) || "not added yet"}</div>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 mt-3">
                <label>Country</label>
                {/* <input type="text" value={"not added country"} onChange={(e) => setUser({ ...User, country: e.target.value })} placeholder='Postcode / Zip' name='country' /> */}
                <div className='address-complement me-3'>{(User?.address && User?.address[0]?.country) || "not added yet"}</div>
              </div>
              <div className='mt-3 col-lg-6 col-md-6 col-sm-6'>
                <label>Post/ZIP Code</label>
                {/* <input type="text" value={"not added postcode"} onChange={(e) => setUser({ ...User, postcode: e.target.value })} placeholder='postcode' name='postcode' /> */}
                <div className='address-complement'>{(User?.address && User?.address[0]?.postcode) || "not added yet"}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-lg-3">
            <label>Phone Number</label>
          </div>
          <div className="col-lg-9">
            <div className='text-center'>
              <input type="tel" value={User.phone} onChange={(e) => setUser({ ...User, phone: e.target.value })} placeholder='add your mobile number' name='number' />
            </div>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-lg-3">
            <label>Birth Date</label>
          </div>
          <div className="col-lg-9">
            <div className='text-center'>
              <input type="date" value={User.birthday} onChange={(e) => setUser({ ...User, birthday: e.target.value })} placeholder='add your birthday' name='birthday' />
            </div>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-lg-3">
            <label>Email</label>
          </div>
          <div className="col-lg-9">
            <div className='text-center'>
              <input type="email" value={User.email} onChange={(e) => setUser({ ...User, email: e.target.value })} placeholder='add your email' name='email' />
            </div>
          </div>
        </div>
      </div>
      <div className='px-3'>
        <div className="row py-3">
          <div className="col-lg-3">
            <label>More products</label>
          </div>
          <div className="col-lg-9">
            <div className='d-flex align-items-center'>
              <input type="checkbox" className='me-3' />
              <p>Show more products in store</p>
            </div>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-lg-3">
            <label>Store Opening Closing Time</label>
          </div>
          <div className="col-lg-9">
            <div className='d-flex align-items-center'>
              <input type="checkbox" className='me-3' />
              <p>Show store opening closing time widget in store page</p>
            </div>
          </div>
        </div>
      </div>
      <div className='vendore-store-info text-end mt-2 pe-0'>
        {/* <button className='filter-product-btn' onClick={UserSingleAPI}>save</button> */}
        {location.pathname === "/profile" && <button className='filter-product-btn ms-2' onClick={goToEditAccount}>Edit Account</button>}
      </div>
    </div>
  )
}

export default Store