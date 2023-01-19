import { Routes } from "react-router-dom";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  useLocation,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import MainBody from "./component/MainBody";
import LoginPage from "./component/LoginPage";
import Signup from "./component/Signup";
import React, { useState } from "react";
import AddNewPassword from "./component/AddNewPassword";
import UpdatePassword from "./component/UpdatePassword";
import { isAuthnaticated } from "./server/user";
import "./index.css"

export default function App() {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <ProtectedRoute>
                  <MainBody />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <MainBody />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addNewPassword"
              element={
                <ProtectedRoute>
                  <AddNewPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/updatePassword"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ChakraProvider>
    </>
  );
}

// Implements Protectd Routes that only allows authanticated users to login
const ProtectedRoute = ({ children }) => {
  let location = useLocation();

  if (!isAuthnaticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
