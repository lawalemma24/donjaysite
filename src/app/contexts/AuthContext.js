"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch (err) {
        console.warn("Failed to parse stored user:", storedUser);
        localStorage.removeItem("user"); // remove invalid value
      }
    }
  }, []);

  // Login function
  const login = (data) => {
    if (!data) return;

    const normalizedUser = {
      _id: data._id,
      name: data.name,
      email: data.email,
      profilePic: data.profilePic,
      role: data.role,
      notifications: data.notifications || [],
      address: data.address || "",
      phone: data.phoneNumber || "",
    };

    try {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      setUser(normalizedUser);
    } catch (err) {
      console.error("Failed to save user to localStorage:", err);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to access auth context
export const useAuth = () => useContext(AuthContext);
