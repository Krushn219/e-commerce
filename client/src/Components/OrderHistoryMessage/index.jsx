import React from 'react'
import './style.css'

const OrderHistoryMessage = ({order}) => {
  return (
    <div className='orderhistory-reference'>
      <div className='follow-order-staps'>
        <h4>ADD A MESSAGE</h4>
      </div>
      <div className='orderhistory-mess-info'>
        <p>If you would like to add a comment about your order, please write it in the field below.</p>
      </div>
      <div className='row product-orderhistory-main'>
        <div className="col-lg-3 col-3 order-mess-main">
          <label className='pro-mess-label'>Product</label>
        </div>
        <div className="col-lg-9 col-9 order-mess-main">
          <div className='mb-3 message-input'>
            <select>
              <option>-- please choose --</option>
              {order.length && order.map((item) => {
                return <option key={item.id}>{item?.productId?.title}</option>
              })}
            </select>
          </div>
          <div className='message-textarea'>
            <textarea type='text' rows="10" />
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
        <button className="back-account">SEND</button>
      </div>
    </div>
  )
}

export default OrderHistoryMessage
