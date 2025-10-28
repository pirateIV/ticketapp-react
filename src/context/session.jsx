import { createContext, useContext, useEffect, useState } from "react";
import { SessionService } from "@/services/session";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(SessionService.sessionKey);

    if (token) {
      const userData = SessionService.verifyToken(token);
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const signup = async (userCredentials) => {
    return await SessionService.signup(userCredentials);
  };

  const login = async (userCredentials) => {
    return await SessionService.login(userCredentials);
  };

  const logout = () => {
    SessionService.logout();
    window.location.href = "/";
    setError("");
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        isAuthenticated: SessionService.isAuthenticated(),
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
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
