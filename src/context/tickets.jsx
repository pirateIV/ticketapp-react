import { createContext, useContext, useEffect, useState } from "react";
import { TicketService } from "@/services/tickets";

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
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = () => {
    const savedTickets = TicketService.getTickets();
    setTickets(savedTickets);
    setIsLoading(false);
  };

  const addTicket = (ticket) => {
    const newTicket = {
      ...ticket,
      id: `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    TicketService.addTicket(newTicket);
    setTickets((prev) => [...prev, newTicket]);

    return {
      success: true,
      ticket: newTicket,
      message: "Ticket created successfully",
    };
  };

  const editTicket = (ticketId, updatedTicket) => {
    const ticketToUpdate = {
      ...updatedTicket,
      updatedAt: new Date().toISOString(),
    };

    TicketService.editTicket(ticketId, ticketToUpdate);
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, ...ticketToUpdate } : ticket
      )
    );

    return {
      success: true,
      ticket: ticketToUpdate,
      message: "Ticket updated successfully",
    };
  };

  const deleteTicket = (ticketId) => {
    TicketService.deleteTicket(ticketId);
    setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));

    return {
      success: true,
      message: "Ticket deleted successfully",
    };
  };

  const getTicketById = (ticketId) => {
    return tickets.find((ticket) => ticket.id === ticketId);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        isLoading,

        addTicket,
        editTicket,
        deleteTicket,
        getTicketById,
        loadTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};
