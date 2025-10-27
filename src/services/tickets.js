export class TicketService {
  static ticketKey = "ticketapp_tickets";

  static addTicket(ticket) {
    const tickets = this.getTickets();
    tickets.push(ticket);
    this.saveTickets(tickets);
  }

  static editTicket(ticketId, updatedTicket) {
    const tickets = this.getTickets();
    const ticketIndex = tickets.findIndex((t) => t.id === ticketId);
    if (ticketIndex !== -1) {
      tickets[ticketIndex] = { ...tickets[ticketIndex], ...updatedTicket };
      this.saveTickets(tickets);
    }
  }

  static deleteTicket(ticketId) {
    let tickets = this.getTickets();
    tickets = tickets.filter((t) => t.id !== ticketId);
    this.saveTickets(tickets);
  }

  static getTickets() {
    try {
      const tickets = localStorage.getItem(this.ticketKey);
      return tickets ? JSON.parse(tickets) : [];
    } catch (error) {
      console.error("Error loading tickets:", error);
      return [];
    }
  }

  static saveTickets(tickets) {
    try {
      localStorage.setItem(this.ticketKey, JSON.stringify(tickets));
    } catch (error) {
      console.error("Error saving tickets:", error);
    }
  }

  // HNG Validation Helper
  static validateTicket(ticket) {
    const errors = [];

    if (!ticket.title || ticket.title.trim() === "") {
      errors.push("Title is required");
    }

    if (!ticket.status || !["open", "in_progress", "closed"].includes(ticket.status)) {
      errors.push("Status must be one of: open, in_progress, closed");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}