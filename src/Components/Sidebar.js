import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div id="sidebar-wrapper">
      <div className="sidebar-heading text-center py-4 text-danger fs-4 fw-bold text-uppercase border-bottom">
        <i className="fas fa-user-secret me-2"></i>Jio Mart
      </div>
      <div className="list-group list-group-flush my-3">
        <a
          href="#"
          className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
        >
          <i className="fas fa-tachometer-alt me-2"></i>DASHBOARD
        </a>
        <a
          className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
          onClick={() => navigate("/")}
        >
          <i className="fas fa-project-diagram me-2"></i>ORDERS
        </a>

        <a
          href="#"
          className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
        >
          <i className="fas fa-paperclip me-2"></i>REPORTS
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
        >
          <i className="fas fa-shopping-cart me-2"></i>STOCKS
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
        >
          <i className="fas fa-gift me-2"></i>PRODUCTS
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
        >
          <i className="fas fa-comment-dots me-2"></i>CHAT
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action bg-transparent text-white fw-bold"
        >
          <i className="fas fa-map-marker-alt me-2"></i>OUTLET
        </a>
        <a
          href="#"
          className="list-group-item list-group-item-action bg-transparent text-danger fw-bold"
        >
          <i className="fas fa-power-off me-2"></i>LOGOUT
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
