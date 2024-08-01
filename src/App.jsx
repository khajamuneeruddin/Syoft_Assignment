import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Components/DashBoard/Dashboard";

const NotFound = () => (
  <div
    style={{
      height: "100vh",
      color: "#ff0b37",
      fontWeight: "bold",
      fontSize: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    Oops... Page not found...!
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
