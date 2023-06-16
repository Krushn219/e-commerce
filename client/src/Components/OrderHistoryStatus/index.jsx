import React from "react";
import "./style.css";
import { ISOTodate } from "../../Utils/utilFunctions";

const OrderHistoryStatus = ({orders}) => {
  return (
    <div className="orderhistory-reference">
      <div className="follow-order-staps">
        <h4>FOLLOW YOUR ORDER'S STATUS STEP-BY-STEP</h4>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ISOTodate(orders.createdAt)}</td>
              <td>{orders.orderStatus}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryStatus;
