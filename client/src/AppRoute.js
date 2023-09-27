import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import HomeUser from "./components/HomeUser";
import ProtectedRoute from "./ProtectedRoute";
import HomeOfficial from "./components/HomeOfficial";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  {
    path: "/home",
    element: <HomeOfficial />,
    // children: [{ path: "/home", element: <Home /> }],
  },
]);

const AppRoute = () => {
  return <RouterProvider router={router} />;
};

export default AppRoute;
