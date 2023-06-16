import React, { useState } from 'react'
import { postWithdraw } from '../../../Utils/APIs'
import { toast } from 'react-toastify'

const Withdraw = () => {
  const pattern =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  const ifscregex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
  const accountregex = /^\d{9,18}$/
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
  const [withdraw, setwithdraw] = useState({
    amount: '',
    name: '',
    ifsc: '',
    account_number: '',
    email: '',
    contact: '',
    type: '',
    reference_id: ''
  })

  const WithdrawAPI = async () => {
    if (validation(withdraw.amount, withdraw.name, withdraw.ifsc, withdraw.account_number, withdraw.email, withdraw.contact, withdraw.reference_id)) {
      try {
        const res = await postWithdraw({
          amount: withdraw.amount,
          name: withdraw.name,
          ifsc: withdraw.ifsc,
          account_number: withdraw.account_number,
          email: withdraw.email,
          contact: withdraw.contact,
          type: withdraw.type,
          reference_id: withdraw.reference_id
        })
        setwithdraw(res)
        if (res.status === 200) {
          toast.success("Payment successfull")
        } else {
          toast.error("withdraw add an error")
        }
      } catch (error) {
        toast.error("withdraw add an error")
      }
    }
  }

  const validation = (amount, name, ifsc, account_number, email, contact, reference_id) => {
    if (!amount) {
      toast.error('please enter amount')
      return false;
    }

    if (!name) {
      toast.error('please enter name')
      return false;
    }

    if (!email) {
      toast.error("Please enter email");
      return false;
    }

    if (!pattern.test(email)) {
      toast.error("Please enter email in correct format");
      return false;
    }

    if (!ifsc) {
      toast.error("Please enter ifsc code");
      return false;
    }

    if (!ifscregex.test(ifsc)) {
      toast.error("Please enter ifsc code in correct format");
      return false;
    }

    if (!account_number) {
      toast.error("Please enter account number");
      return false;
    }

    if (!accountregex.test(account_number)) {
      toast.error("Please enter account number in correct format");
      return false;
    }

    if (!contact) {
      toast.error("Please enter Mobile number");
      return false;
    }

    if (!phoneRegex.test(contact)) {
      toast.error("Please enter Mobile number in correct format");
      return false;
    }

    if (!reference_id) {
      toast.error("please enter reference_id")
      return false;
    }

    return true;
  }

  const handleInputField = (e) => {
    setwithdraw((value) => ({
      ...value,
      [e.target.name]: e?.target?.value
    }))
  }

  return (
    <div className='vendor-withdraw-wrapper pb-5'>
      <div className='vendor-withdraw-title'>
        <h2>Withdraw</h2>
      </div>
      <div className='withdraw-balance'>
        <p>Current Balance: ${withdraw.amount || "0.00"}</p>
        <p>Withdraw Threshold: 0 days</p>
      </div>
      <p><span>Withdraw Request</span> | <span>Approved Requests</span> | <span>Cancelled Requests</span></p>
      <div className='withdraw-balance'>
        <p>No withdraw method is available. Please update your payment method to withdraw funds. Payment Settings Setup <span>Payment Settings Setup</span></p>
      </div>
      <div className='withdraw-payment'>
        <h3>Payment Setting :-</h3>
        <div>
          <label htmlFor="amount">amount : </label>
          <input
            type="number"
            id='amount'
            name='amount'
            value={withdraw.amount}
            onChange={handleInputField} />
        </div>
        <div>
          <label htmlFor="name">Name : </label>
          <input
            type="text"
            id='name'
            name='name'
            value={withdraw.name}
            onChange={handleInputField} />
        </div>
        <div>
          <label htmlFor="ifsc">IFSC : </label>
          <input
            type="text"
            id='ifsc'
            name='ifsc'
            value={withdraw.ifsc}
            onChange={handleInputField} />
        </div>
        <div>
          <label htmlFor="account_number">Account Number : </label>
          <input
            type="number"
            id='account_number'
            name='account_number'
            value={withdraw.account_number}
            onChange={handleInputField} />
        </div>
        <div>
          <label htmlFor="email">email : </label>
          <input
            type="email"
            id='email'
            name='email'
            value={withdraw.email}
            onChange={handleInputField} />
        </div>
        <div>
          <label htmlFor="contact">Contact : </label>
          <input
            type="number"
            id='contact'
            name='contact'
            value={withdraw.contact}
            onChange={handleInputField} />
        </div>
        <div>
          <label htmlFor="type">User Type : </label>
          <input
            type="text"
            id='type'
            name='type'
            value={withdraw.type}
            onChange={handleInputField} />
        </div>
        <div>
          <label htmlFor="reference_id">Reference_id : </label>
          <input
            type="text"
            id='reference_id'
            name='reference_id'
            value={withdraw.reference_id}
            onChange={handleInputField} />
        </div>
      </div>
      <button onClick={WithdrawAPI}>Save</button>
    </div>
  )
}

export default Withdraw