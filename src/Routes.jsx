import React from "react";
import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";
import AddNewPassword from "./component/AddNewPassword";
import Login from "./component/LoginPage";
import MainBody from "./component/MainBody";
import UpdatePassword from "./component/UpdatePassword";
// import UpdatePassword from "./component/UpdatePassword";
import Signup from "./component/Signup";
import "./index.css";
import { isAuthnaticated } from "./server/user";

const ProtectedRoute = ({ children }) => {
  let location = useLocation();

  if (!isAuthnaticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainBody />
      </ProtectedRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <MainBody />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/addNewPassword",
    element: (
      <ProtectedRoute>
        <AddNewPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: "/UpdatePassword",
    element: (
      <ProtectedRoute>
        {" "}
        <UpdatePassword />
      </ProtectedRoute>
    ),
  },
]);

export default routes;
// Implements Protectd Routes that only allows authanticated users to login
