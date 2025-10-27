import { TicketService } from "@/services/tickets";
import { useEffect } from "react";
import { useState } from "react";
import { createContext, useContext } from "react";

const TicketContext = createContext();

export const useTickets = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error("useTickets must be used within a TicketProvider");
  }
  return useContext(TicketContext);
};

const ticketInitialState = {
  // open: false,
  // resolved: false,
  title: "",
  description: "",
  status: "in_progress", // open, in_progress, closed

  // Color & Status Rules:
  // open → Green tone
  // in_progress → Amber tone
  // closed → Gray tone

  priority: "low", // low, medium, high,
  createdAt: new Date().toISOString(),
};

const initialState = {
  tickets: [],
};

export const TicketProvider = ({ children }) => {
  const [ticketState, setTicketState] = useState(
    TicketService.getTickets() || []
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTicketState(TicketService.getTickets() || []);
    setIsLoading(false);
  }, []);

  // Get the total number of tickets
  const ticketsCount = ticketState.length;

  function addTicket(ticket) {
    TicketService.addTicket(ticket);
  }

  function editTicket(ticketId, updatedTicket) {
    TicketService.editTicket(ticketId, updatedTicket);
  }

  function deleteTicket(ticketId) {
    TicketService.deleteTicket(ticketId);
  }

  return (
    <TicketContext.Provider
      value={{
        tickets: ticketState,
        ticketsCount,
        isLoading,

        addTicket,
        editTicket,
        deleteTicket,
        setTicketState,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
