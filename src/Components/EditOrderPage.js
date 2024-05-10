import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { API } from "../API/api";
import { useNavigate, useParams } from "react-router-dom";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditOrderPage = () => {
  const [orderId, setOrderId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch order details based on order ID from the URL params
    fetchOrderDetails(id);
  }, [id]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`${API}/orders/${orderId}`);
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }
      const data = await response.json();
      // Extract only the date part from the orderDate string
      const date = new Date(data.orderDate);
      const formattedDate = date.toISOString().split("T")[0];
      setOrder(data);
      setOrderId(data.orderId);
      setOrderDate(formattedDate);
      setCustomerName(data.customerName);
      setItems(data.items);
    } catch (error) {
      console.error("Error fetching order details:", error);
      // Handle error, show message to the user
    }
  };

  // Function to handle adding a new item
  const handleAddItem = () => {
    setItems([
      ...items,
      { itemName: "", unitPrice: "", quantity: "", amount: "" },
    ]);
  };

  // Function to handle deleting an item
  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const handleInputChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    newItems[index].amount =
      newItems[index].unitPrice * newItems[index].quantity;
    setItems(newItems);
  };

  const calculateTotalAmount = () => {
    return items.reduce((total, item) => total + item.amount, 0);
  };

  const handleSaveOrder = async () => {
    try {
      const response = await fetch(`${API}/orders/editorder/${order._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderDate,
          customerName,
          items,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      // Show success alert
      alert("Order updated successfully!");
      navigate("/");

      // Redirect to orders page
      // You can use React Router for this
    } catch (error) {
      console.error("Error saving order:", error);
      // Handle error, show message to the user
    }
  };

  const handleCancelOrder = () => {
    // Implement cancelling order functionality
    const isConfirmed = window.confirm(
      "Are you sure you want to cancel updating this order?"
    );
    if (isConfirmed) {
      // Redirect back to order page
      navigate("/");
    }
  };

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          {/* Edit Order Section */}
          <div className="mb-4">
            <h2>EditOrder</h2>
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
                    readOnly
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
                    readOnly
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
                    readOnly
                  />
                </div>
              </div>
            </form>
          </div>
          {/* Item Section */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center">
              <h2>Edit Order - {orderId}</h2>
              <button className="btn btn-light" onClick={handleAddItem}>
                Add Item
              </button>
            </div>
            <table className="table">
              {/* Table Header */}
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Unit Price</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {/* Table Body */}
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
                onClick={handleCancelOrder}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditOrderPage;
