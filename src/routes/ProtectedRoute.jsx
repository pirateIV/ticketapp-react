import { Navigate } from "react-router-dom";

import { useAuth } from "@/context/auth";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};
