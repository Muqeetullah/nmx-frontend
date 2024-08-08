// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";

// Define User type

// Create context with initial values
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

// Custom hook to use Auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isAuthenticated = !!user; // Check if user exists

  // const history = useHistory();

  // Function to handle login
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  // Function to handle logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    window.location.reload();

    // history.push("/"); // Redirect to home page after logout
  };

  useEffect(() => {
    // Check if user exists in localStorage on mount
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
