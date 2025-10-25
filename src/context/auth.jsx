import { createContext, useEffect, useState } from "react";
import { AuthService } from "@/services/auth";
import { useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: AuthService.isAuthenticated(),
        loading,
        error,

        signup,
        login,
        logout,
        setUser,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if(context=== undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context;
}