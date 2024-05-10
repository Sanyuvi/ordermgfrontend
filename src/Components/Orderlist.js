import React from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";

const Orderlist = ({ orders = [], onDelete }) => {
  const navigate = useNavigate();
  const handleEditOrder = (orderId) => {
    navigate(`/editorder/${orderId}`); // Navigate to edit order page with orderId
  };
  return (
    <div className="container">
      <table className="table bg-light">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Customer Name</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders && orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderId}</td>
                <td>{format(new Date(order.orderDate), "dd-MM-yyyy")}</td>
                <td>{order.customerName}</td>
                <td>{order.amount}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    className=" me-2"
                    onClick={() => handleEditOrder(order._id)}
                  />
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className=" me-2"
                    onClick={() => onDelete(order._id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No orders available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Orderlist;
