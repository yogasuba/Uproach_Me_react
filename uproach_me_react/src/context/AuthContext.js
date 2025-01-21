import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [fromSignup, setFromSignup] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

const login = async (credentials) => {
  const loggedInUser = { id: 1, name: "User" }; // Example user object
  setUser(loggedInUser);
  localStorage.setItem("user", JSON.stringify(loggedInUser));
  setFromSignup(false);
  navigate("/dashboard"); // Ensure this happens after the above
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Clear persisted user
    navigate("/");
  };

  const completeSignup = () => {
    const signedUpUser = { id: 1, name: "User" }; // Example user object
    setUser(signedUpUser);
    localStorage.setItem("user", JSON.stringify(signedUpUser)); // Persist user
    setFromSignup(true);
    navigate("/dashboard");
  };

  return (
    <AuthContext.Provider
      value={{ user, fromSignup, login, logout, completeSignup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
