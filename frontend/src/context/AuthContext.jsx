import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { authService } from "@/services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = unknown/loading, false = anon, object = auth
  const [loading, setLoading] = useState(true);

  const persist = useCallback((token, account) => {
    localStorage.setItem("cet_token", token);
    setUser(account);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("cet_token");
    setUser(false);
  }, []);

  const loadMe = useCallback(async () => {
    const token = localStorage.getItem("cet_token");
    if (!token) {
      setUser(false);
      setLoading(false);
      return;
    }
    try {
      const me = await authService.me();
      setUser(me);
    } catch {
      localStorage.removeItem("cet_token");
      setUser(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMe();
  }, [loadMe]);

  const register = async (payload) => {
    const data = await authService.register(payload);
    persist(data.token, { ...data.candidate, role: "candidate" });
    return data;
  };

  const login = async (payload) => {
    const data = await authService.login(payload);
    persist(data.token, { ...data.candidate, role: "candidate" });
    return data;
  };

  const adminLogin = async (payload) => {
    const data = await authService.adminLogin(payload);
    persist(data.token, { ...data.admin, role: "admin" });
    return data;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, adminLogin, logout, refresh: loadMe }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
