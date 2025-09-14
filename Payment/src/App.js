import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Payment from "./Components/Payment";

function App() {
  return (
    <BrowserRouter basename="/home/payment">
      <Routes>
        <Route path="/" element={<Payment />} />
        {/* Add more account routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
