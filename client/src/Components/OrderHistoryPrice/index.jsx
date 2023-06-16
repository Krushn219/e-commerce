import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './style.css'

const OrderHistoryPrice = ({ orders }) => {
  const navigate = useNavigate()
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    orders.forEach((item) => {
      total += item?.productId?.withDiscount * item?.quantity;
    });
    setTotal(total);
  }, [orders]);

  const goToProductpage = (id) => {
    navigate(`/products/${id}`)
  }

  return (
    <div className="orderhistory-reference orderhistory-price-wrapper">
      <div className="table-responsive">
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th>Product</th>
              <th className='text-center'>Quantity</th>
              <th className='text-center'>Unit price</th>
              <th className='text-center'>Total price</th>
            </tr>
          </thead>
          <tbody>
            {orders?.length ? orders.map((item) => {
              return <tr key={item.id}>
                <td onClick={() => goToProductpage(item?.productId?._id)}><p className='mb-1 product-order-title'>{item?.productId?.title}</p>
                  Reference: {item?._id}</td>
                <td className='text-end'>{item.quantity}</td>
                <td className='text-end'>$ {item?.productId?.withDiscount}</td>
                <td className='text-end'>$ {item?.quantity * item?.productId?.withDiscount}</td>
              </tr>
            }) : <p>No orders yet</p>}

            <tr>
              <td colspan='3' className='text-end'>Subtotal</td>
              <td className='text-end'>$ {total}</td>
            </tr>
            <tr>
              <td colspan='3' className='text-end'>Shipping and handling</td>
              <td className='text-end'>$ {total === 0 ? 0 : 7}</td>
            </tr>
            <tr>
              <td colspan='3' className='text-end'>Total</td>
              <td className='text-end'>$ {total === 0 ? 0 : total + 7}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderHistoryPrice