"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      console.log("RESTORED USER FROM STORAGE:", parsed);
      setUser(parsed);
    }
  }, []);

  const login = (data) => {
    const normalizedUser = {
      _id: data._id,
      name: data.username || data.fullName || "Guest",
      email: data.email || "unknown@email.com",
      profilePic: data.profilePic,
      role: data.role || "customer",
      notifications: data.notifications || [],
      country: data.country || "",
      phone: data.phone || "+1234567890",
    };

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    setUser(normalizedUser);

    console.log("SAVED USER TO STORAGE:", normalizedUser);
  };

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

export const useAuth = () => useContext(AuthContext);
