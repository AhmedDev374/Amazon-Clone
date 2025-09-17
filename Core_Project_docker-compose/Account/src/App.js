import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Components/Profile";
import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/home/account">
      <Routes>
        <Route path="/" element={<Profile />} />
        {/* Add more account routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
