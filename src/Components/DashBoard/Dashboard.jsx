import React from "react";
import { useNavigate, Navigate } from "react-router-dom";

import "./Dashboard.css";
import HomePage from "../HomePage/HomePage";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user_information"));
  console.log(user, "u");
  if (!user) return <Navigate to={"/login"} />;

  return (
    <div className="dashboard-container">
      <HomePage />
    </div>
  );
};

export default Dashboard;
