import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { API } from "../API/api";
import { useNavigate } from "react-router";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NewOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const handleAddItem = () => {
    setItems([
      ...items,
      { itemName: "", unitPrice: "", quantity: "", amount: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount =
      newItems[index].unitPrice * newItems[index].quantity;
    setItems(newItems);
  };

  const handleDeleteItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.amount, 0);
  };

  const handleSaveOrder = async () => {
    try {
      const response = await fetch(`${API}/orders/neworder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          orderDate,
          customerName,
          items,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      // Clear input fields
      setOrderId("");
      setOrderDate("");
      setCustomerName("");
      setItems([]);

      // Fetch and update list of orders
      const responseData = await response.json();
      if (responseData && responseData.orders) {
        setOrders(responseData.orders);
      }
      // Show success alert
      alert("Order created successfully!");
    } catch (error) {
      console.error("Error saving order:", error);
      // Handle error, show message to the user
    }
  };

  // Function to handle cancelling the order
  const handleCancelOrder = () => {
    // Implement cancelling order functionality
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel creating a new order?"
    );
    if (isConfirmed) {
      // Redirect back to order page
      navigate("/");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          {/* New Order Section */}
          <div className="mb-4">
            <h2>New Order</h2>
            <form>
              <div className="row mb-3 mt-5">
                <label htmlFor="orderId" className="col-md-2 col-form-label">
                  Order ID
                </label>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="orderDate" className="col-md-2 col-form-label">
                  Order Date
                </label>
                <div className="col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    id="orderDate"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <label
                  htmlFor="customerName"
                  className="col-md-2 col-form-label"
                >
                  Customer Name
                </label>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Item Section */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Item</h2>
              <button className="btn btn-light" onClick={handleAddItem}>
                Add Item
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={item.itemName}
                        onChange={(e) =>
                          handleInputChange(index, "itemName", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.unitPrice}
                        onChange={(e) =>
                          handleInputChange(index, "unitPrice", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={item.quantity}
                        onChange={(e) =>
                          handleInputChange(index, "quantity", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={item.amount}
                        readOnly
                      />
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        onClick={() => handleDeleteItem(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total Amount */}
          <div className="mb-4 row">
            <div className="col-md-7"></div>{" "}
            {/* Empty column to push the label and input field to the right */}
            <label className="col-md-2 col-form-label text-end">
              Total Amount:
            </label>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                value={calculateTotalAmount()}
                readOnly
              />
            </div>
          </div>
          {/* Save and Cancel Buttons */}
          <div className="mb-4 d-flex justify-content-center mt -4 ml-5">
            <button className="btn btn-light me-2 " onClick={handleSaveOrder}>
              Save
            </button>
            <button
              className="btn btn-dark ml-5 "
              onClick={() => handleCancelOrder()}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrderPage;
