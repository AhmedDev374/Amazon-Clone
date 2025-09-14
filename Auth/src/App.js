import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";

function App() {
  return (
    <Router basename="/auth">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        {/* Add more account routes here */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

