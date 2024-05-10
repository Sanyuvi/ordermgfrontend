import React, { useState, useEffect } from "react";

import Orderlist from "./Orderlist.js";
import Sidebar from "./Sidebar.js";
import { useNavigate } from "react-router";
import { API } from "../API/api.js";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from your API backend
    fetch(`${API}/orders`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleDeleteOrder = async (orderId) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this order?"
      );
      if (!isConfirmed) {
        return; // If the user cancels deletion, do nothing
      }

      const response = await fetch(`${API}/orders/deleteorder/${orderId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      // Remove the deleted order from the orders list
      setOrders(orders.filter((order) => order._id !== orderId));

      // Show success alert
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Error deleting order:", error);
      // Handle error, show message to the user
    }
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
            <button
              className="btn btn-secondary "
              onClick={() => navigate("/neworder")}
            >
              New Order
            </button>
          </div>
          <div className="order-list-container">
            <Orderlist orders={orders} onDelete={handleDeleteOrder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
