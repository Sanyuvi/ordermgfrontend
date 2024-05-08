import React from "react";

const Orderlist = ({ orders = [], onDelete, onEdit }) => {
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
                <td>{order.orderDate}</td>
                <td>{order.customerName}</td>
                <td>{order.amount}</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => onEdit(order)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(order.id)}
                  >
                    Delete
                  </button>
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
