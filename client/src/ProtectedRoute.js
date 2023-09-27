// ProtectedRoute.js
import React from "react";
import { useNavigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  if (!isAuthenticated) {
    navigate("/login", { replace: true });
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
