import React from "react";
import { ISOTodate } from "../../Utils/utilFunctions";

const OrderHistoryCheckout = ({orders}) => {
  return (
    <div className="orderhistory-reference">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Carrier</th>
              <th>Weight</th>
              <th>Shipping cost</th>
              <th>Tracking number</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ISOTodate(orders.createdAt)}</td>
              <td>{orders.shippingMethod}</td>
              <td>-</td>
              <td>$7.00</td>
              <td>-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryCheckout;
