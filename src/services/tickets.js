export class TicketService {
  static ticketKey = "tickets";

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
    const tickets = localStorage.getItem(this.ticketKey);
    return tickets ? JSON.parse(tickets) : [];
  }

  static saveTickets(tickets) {
    localStorage.setItem(this.ticketKey, JSON.stringify(tickets));
  }
}