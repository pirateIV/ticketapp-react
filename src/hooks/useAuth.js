import { useEffect, useState } from "react";
import { AuthService } from "@/services/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const signup = (userCredentials) => {
   return AuthService.signup(userCredentials)
  };

  const login = (email, password) => {
    console.log(email, password);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return {
    user,
    isAuthenticated: !!user,
    loading,

    signup,
    login,
    logout,
  };
}
