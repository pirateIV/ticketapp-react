import { BrowserRouter as Router } from "react-router-dom";

import { SessionProvider } from "./context/session";
import { TicketProvider } from "./context/tickets";

export const AppProviders = ({ children }) => {
  return (
    <SessionProvider>
      <TicketProvider>
        <Router>{children}</Router>
      </TicketProvider>
    </SessionProvider>
  );
};
