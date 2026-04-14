/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { http } from "../api/http";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const setSession = (token, nextUser) => {
    localStorage.setItem("token", token);
    setUser(nextUser);
  };

  const clearSession = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const signup = async (payload) => {
    const response = await http.post("/auth/signup", payload);
    setSession(response.data.token, response.data.user);
    return response.data.user;
  };

  const login = async (payload) => {
    const response = await http.post("/auth/login", payload);
    setSession(response.data.token, response.data.user);
    return response.data.user;
  };

  const logout = () => {
    clearSession();
  };

  const refreshMe = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      clearSession();
      setLoading(false);
      return;
    }

    try {
      const response = await http.get("/auth/me");
      setUser(response.data.user);
    } catch {
      clearSession();
    } finally {
      setLoading(false);
    }
  };

  const updateBranding = async (payload) => {
    const response = await http.patch("/auth/settings/branding", payload);
    setUser(response.data.user);
    return response.data.user;
  };

  useEffect(() => {
    refreshMe();
  }, []);

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    refreshMe,
    updateBranding
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
