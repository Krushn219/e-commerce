import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faHome } from "@fortawesome/free-solid-svg-icons";
import { getOrder } from "../../Utils/APIs";
import { toast } from "react-toastify";
import { ISOTodate } from "../../Utils/utilFunctions";

const OrderHistory = () => {
  const [orders, setorders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await getOrder();
      setorders(res.data.orders);
    } catch (e) {
      toast.error(e);
    }
  };

  const handleReorder = () => {
    navigate(`/checkout`);
  };
  const handleDetail = (orderid) => {
    navigate(`/orderhistory-detail/${orderid}`)
  }

  return (
    <div className="order-history-wrapper">
      <div className="order-history-main-wrapper">
        <div className="order-history-wrapper2">
          <div className="order-history-para">
            <p>
              Here are the orders you've placed since your account was
              created.
            </p>
            <div className="table-responsive mx-3">
              {orders.length ?
                <table className="table table-bordered wishlist-table">
                  <thead>
                    <tr>
                      <th scope="col">Order reference</th>
                      <th scope="col">Date</th>
                      <th scope="col">Total price</th>
                      <th scope="col">Payment</th>
                      <th scope="col">Status</th>
                      <th scope="col">Invoice</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length ? (
                      orders.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td> {item._id} </td>
                            <td> {ISOTodate(item.createdAt)} </td>
                            <td>$ {item.totalPrice} </td>
                            <td> {item.Payment} </td>
                            <td> {item.orderStatus} </td>
                            <td> -{item.invoice} </td>
                            <td>
                              {" "}
                              <span className="reorder pe-1" onClick={() => handleDetail(item._id)}>Details</span>{" "} |
                              <span className="reorder ps-2" onClick={handleReorder}>
                                Re-order
                              </span>{" "}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <p>No order created yet</p>
                    )}
                  </tbody>
                </table> : <p>no order create</p>
              }
            </div>
          </div>
        </div>
        <Link to="/my-account">
          <button className="back-account mt-4">
            <FontAwesomeIcon icon={faAngleLeft} className="me-2" />
            <span>Back to Your Account</span>
          </button>
        </Link>
        <Link to="/">
          <button className="back-account main-home-svg">
            <FontAwesomeIcon icon={faHome} className="me-2" />
            <span>Home</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderHistory;
