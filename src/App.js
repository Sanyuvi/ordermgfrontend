import { Route, Routes } from "react-router-dom";
import "./App.css";

import OrdersPage from "./Components/Orderspage.js";
import NewOrderPage from "./Components/NewOrderPage.js";
import EditOrderPage from "./Components/EditOrderPage.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<OrdersPage />} />
        <Route path="/neworder" element={<NewOrderPage />} />
        <Route path="/editorder/:id" element={<EditOrderPage />} />
      </Routes>
    </div>
  );
}

export default App;
