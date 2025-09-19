import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// page
import Home from "./pages/home";
import Catalog from "./pages/catalog";
import ItemDetails from "./pages/ItemDetails"; 
//import Cart from "./pages/cart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ItemDetails />} /> 
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
