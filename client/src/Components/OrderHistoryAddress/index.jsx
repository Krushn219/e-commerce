import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getSingleUser } from '../../Utils/APIs';
import { filterAddresses } from '../../Utils/Data';
import './style.css'

const OrderHistoryAddress = () => {
const [updatedAddress, setupdatedAddress] = useState({
  address: "",
  addressComplement: "",
  city: "",
  state: "",
  postcode: "",
  country: "",
  title: "Delivery address My Address"
});

useEffect(() => {
  getAddressToUpdate();
}, []);

const getAddressToUpdate = async () => {
  const res = await getSingleUser()
  if(res.status === 200){
    setupdatedAddress(filterAddresses(res?.data?.user?.address))
  } else {
    toast.error("no")
  }
};
  return (
    <div className="orderhistory-address-wrapper">
      <div className='row'> 
        {updatedAddress.length && updatedAddress.map((element) => {
          return <div key={element.id} className='col-lg-6'>
            <div className="orderhistory-reference">
            <div className="orderhistory-address-title">
              <h4>{element.title}</h4>
            </div>
            <div className='orderhistory-address-info'>
              <p>{element.address}</p>
              <p>{element.addressComplement}</p>
              <p>{element.state}, {element.city} {element.postcode}</p>
              <p>{element.country}</p>
            </div>
            </div>
          </div>
        })}
      </div>
    </div>
  )
}

export default OrderHistoryAddress