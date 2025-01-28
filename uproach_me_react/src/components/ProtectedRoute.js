import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Show a loading spinner or placeholder while checking authentication
  if (loading) {
    return <div>Loading...</div>; // Replace with a loader component if desired
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component if user is authenticated
  return children;
};

export default ProtectRoute;
