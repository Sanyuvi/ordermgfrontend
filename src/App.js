import { Route, Routes } from "react-router-dom";
import "./App.css";

import OrdersPage from "./Components/Orderspage.js";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<OrdersPage />} />
      </Routes>
    </div>
  );
}

export default App;
