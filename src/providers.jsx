import { BrowserRouter as Router } from "react-router-dom";

import { AuthProvider } from "./context/auth";
import { TicketProvider } from "./context/tickets";

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <TicketProvider>
        <Router>{children}</Router>
      </TicketProvider>
    </AuthProvider>
  );
};
