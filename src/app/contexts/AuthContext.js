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
      name: data.name,
      email: data.email,
      profilePic: data.profilePic,
      role: data.role,
      notifications: data.notifications || [],
      address: data.address || "",
      phone: data.phoneNumber || "",
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
