import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// page
import Home from "./pages/home/home";
import Catalog from "./pages/catalog/catalog";
import ItemDetails from "./pages/ItemDetails/ItemDetails"; 
import NotFound from "./pages/NotFound/NotFound";
//import Cart from "./pages/cart";

// 404 page
// folder for page (css + page) + component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/catalog/:id" element={<ItemDetails />} /> 
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
