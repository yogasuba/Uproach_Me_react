import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add a loading state
  const [fromSignup, setFromSignup] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false); // Mark loading as complete
  }, []);

  const login = async (credentials) => {
    // Perform login logic (use API call here)
    const loggedInUser = { id: 1, name: "User" }; // Example user object
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser)); // Persist user
    setFromSignup(false);
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear persisted user
    navigate("/login");
  };

  const completeSignup = () => {
    const signedUpUser = { id: 1, name: "User" }; // Example user object
    setUser(signedUpUser);
    localStorage.setItem("user", JSON.stringify(signedUpUser)); // Persist user
    setFromSignup(true);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, fromSignup, login, logout, completeSignup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
