import { useEffect, useState } from "react";
import { AuthService } from "@/services/auth";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const signup = async (userCredentials) => {
    return await AuthService.signup(userCredentials);
  };

  const login = async (userCredentials) => {
    return await AuthService.login(userCredentials);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setError("");
  };

  return {
    user,
    isAuthenticated: !!user,
    loading,
    error,

    signup,
    login,
    logout,
    setError,
  };
}
