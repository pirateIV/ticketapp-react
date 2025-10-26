import { TicketService } from "@/services/tickets";
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
  status: "open", // open, resolved
};

const initialState = {
  tickets: [],
};

export const TicketProvider = () => {
  const [ticketState, setTicketState] = useState(
    TicketService.getTickets() || initialState
  );

  // Get the total number of tickets
  const ticketsCount = ticketState.tickets.length;

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
        ticketState,
        ticketsCount,

        addTicket,
        editTicket,
        deleteTicket,
        setTicketState,
      }}
    ></TicketContext.Provider>
  );
};
