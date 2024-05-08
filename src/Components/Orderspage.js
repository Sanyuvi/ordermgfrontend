import React, { useState, useEffect } from "react";

import Orderlist from "./Orderlist.js";
import Sidebar from "./Sidebar.js";

const OrdersPage = () => {
  const mockedOrders = [
    {
      id: 1,
      orderId: "ORD001",
      orderDate: "2024-05-10",
      customerName: "John Doe",
      amount: 100.0,
    },
    {
      id: 2,
      orderId: "ORD002",
      orderDate: "2024-05-11",
      customerName: "Jane Smith",
      amount: 150.0,
    },
    // Add more mocked orders as needed
  ];
  console.log(mockedOrders);
  //   const [orders, setOrders] = useState([]);

  //   useEffect(() => {
  //     // Fetch orders from your API backend
  //     fetch("your-api-url/orders")
  //       .then((response) => response.json())
  //       .then((data) => setOrders(data))
  //       .catch((error) => console.error("Error fetching orders:", error));
  //   }, []);

  const handleDeleteOrder = (orderId) => {
    // Implement delete order functionality here
    // This function will be passed down to OrderList component
  };
  const handleEditOrder = (orderId) => {
    // Implement delete order functionality here
    // This function will be passed down to OrderList component
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="orders-heading-container">
            <h1 className="orders-heading">Orders</h1>
            <button className="new-order-button">New Order</button>
          </div>
          <div className="order-list-container">
            <Orderlist
              orders={mockedOrders}
              onDelete={handleDeleteOrder}
              onEdit={handleEditOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
