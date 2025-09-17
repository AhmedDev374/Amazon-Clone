import "./App.css";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Lists from "./Components/Lists"; // your Wishlist component

function App() {
  return (
    <BrowserRouter basename="/home/wishlist">
      <Routes>
        <Route path="/" element={<Lists />} />
        {/* Add more account routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
