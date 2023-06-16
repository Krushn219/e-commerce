import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getSingleUser } from '../../Utils/APIs'

const Payment = () => {
  const navigate = useNavigate()
  const [User, setUser] = useState()

  const goToStoreSetting = () => {
    navigate(`/store`)
  }

  useEffect(() => {
    UserSingleAPI()
  }, [])

  const UserSingleAPI = async () => {
    try {
      const res = await getSingleUser();
      setUser(res?.data?.user);
    } catch (error) {
      toast(error);
    }
  };

  return (
    <div className='vendor-store-wrapper vendor-payment-store'>
      <div className="vendore-store-header">
        <h2>Payment Settings → <span>Visit Store</span></h2>
      </div>
      <p className='pt-3'>These are the withdraw methods available for you. Please update your payment information below to submit withdraw requests and get your store payments seamlessly.</p>
      <div className='vendor-payment-info my-3'>
        <label htmlFor="" className='me-3'>PayPal</label>
        <div className="input-group w-50">
          <span className="input-group-text" id="basic-addon1">Email</span>
          <input 
          type="text" 
          className="form-control" 
          placeholder="abc@gmail.com" 
          value={User?.email}
          onChange={(e) => setUser({ ...User, email: e.target.value })} />
        </div>
      </div>
      <div className='text-center pb-5'>
        <button className='filter-product-btn mb-5' onClick={goToStoreSetting}>update settings</button>
      </div>
    </div>
  )
}

export default Payment