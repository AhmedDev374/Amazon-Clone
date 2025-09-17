import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./Components/ProductPage";
import "./App.css";

function RedirectToHome() {
  // Hard-coded redirect to localhost/home
  window.location.href = "http://localhost/home";
  return null; // nothing to render
}

function App() {
  return (
    <BrowserRouter basename="/home/product">
      <Routes>
        {/* Exact product page route */}
        <Route path=":id" element={<ProductPage />} />

        {/* Any extra segments after the product ID redirect to localhost/home */}
        <Route path=":id/*" element={<RedirectToHome />} />

        {/* Fallback: unknown routes also go to localhost/home */}
        <Route path="*" element={<RedirectToHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
