import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <BrowserRouter basename="/home">
      <Routes>
        {/* Home page */}
        <Route path="/" element={<Home />} />
        {/* Add more account routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
