import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./context/auth";

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <Router>{children}</Router>
    </AuthProvider>
  );
};
