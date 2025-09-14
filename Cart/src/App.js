// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import CartSection from "./Components/CartSection";

function App() {
  return (
    <BrowserRouter basename="/home/cart">
      <Routes>
        <Route path="/" element={<CartSection />} />
        {/* Add more account routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
