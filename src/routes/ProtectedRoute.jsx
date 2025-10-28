import { Navigate } from "react-router-dom";

import { useSession } from "@/context/session";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSession();
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};
