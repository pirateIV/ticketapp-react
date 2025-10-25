import { createContext, useEffect, useState } from "react";
import { AuthService } from "@/services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  const register = () => {};

  const login = () => {
    if (user) {
      const token = AuthService.generateToken(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      return { success: true };
    }
    return {
      success: false,
      error: "Invalid credentials",
    };
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,

        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
