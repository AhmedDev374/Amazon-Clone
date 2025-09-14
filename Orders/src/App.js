// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Orders from "./Components/Orders";

function App() {
  console.log("✅ App mounted");

  return (
    <BrowserRouter basename="/home/orders">
      <Routes>
        <Route path="/" element={<Orders />} />
        {/* Add more account routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
