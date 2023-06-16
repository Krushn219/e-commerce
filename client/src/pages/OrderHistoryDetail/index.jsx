import React, { useEffect, useState } from 'react'
import './style.css'
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faHome } from '@fortawesome/free-solid-svg-icons'
import OrderHistoryStatus from '../../Components/OrderHistoryStatus';
import OrderHistoryAddress from '../../Components/OrderHistoryAddress';
import OrderHistoryPrice from '../../Components/OrderHistoryPrice';
import OrderHistoryCheckout from '../../Components/OrderHistoryCheckout';
import OrderHistoryMessage from '../../Components/OrderHistoryMessage';
import { OrderSinglewithId } from '../../Utils/APIs';
import { toast } from 'react-toastify';
import moment from 'moment';

const OrderHistoryDetail = () => {
  const {orderid} = useParams()
  const [orders, setorders] = useState([]);
  const [order, setorder] = useState([])

  useEffect(() => {
    getOrders();
    getOrdersCart();
  }, []);

  const getOrders = async () => {
    try {
      const res = await OrderSinglewithId(orderid);
      setorders(res.data.order);
    } catch (e) {
      toast.error(e);
    }
  };

  const getOrdersCart = async () => {
    try {
      const res = await OrderSinglewithId(orderid);
      setorder(res.data.order.cartdetails[0]);
    } catch (e) {
      toast.error(e);
    }
  };

  const createdAt = moment(orders.createdAt).utc().format("DD/MM/YYYY");

  return (
    <div className="orderhistory-detail-wrapper">
      <div className='container'>
        <div className="pt-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to="/profile">Your Account</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to='/order-history'>Order History</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {orderid}
              </li>
            </ol>
          </nav>
        </div>
        <div className="orderhistory-detail-main-wrapper">
          <div className="orderhistory-detail-inner-wrapper">
            <div className='d-flex flex-wrap justify-content-between align-items-center orderhistory-reference'>
              <div className='page-order-detail'>
                <p>Order Reference {orderid} - placed on {createdAt}</p>
              </div>
              <div className='reorder-main'>
                <Link to='/checkout'><p className='order-reorder'>Reorder</p></Link>
              </div>
            </div>
            <div className="orderhistory-reference">
              <div className='page-order-detail'>
                <p>Carrier My carrier</p>
                <p>Payment method Payments by check</p>
              </div>
            </div>
            <OrderHistoryStatus orders={orders} />
            <OrderHistoryAddress />
            <OrderHistoryPrice orders={order}/>
            <OrderHistoryCheckout orders={orders} />
            <OrderHistoryMessage order={order} />
          </div>
        </div>
        <Link to='/my-account'>
          <button className='back-account mt-4'>
            <FontAwesomeIcon icon={faAngleLeft} className='me-2' />
            <span>Back to Your Account</span>
          </button>
        </Link>
        <Link to='/'>
          <button className='back-account main-home-svg'>
            <FontAwesomeIcon icon={faHome} className='me-2' />
            <span>Home</span>
          </button>
        </Link>
      </div>
    </div>
  )
}

export default OrderHistoryDetail