import { useState } from "react";
import { useTickets } from "@/context/tickets";
import { Link } from "react-router-dom";

export default function Tickets() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const { tickets, isLoading, deleteTicket } = useTickets();

  // HNG Compliant Status Colors
  const statusColors = {
    open: "bg-green-100 text-green-800 border-green-200",
    in_progress: "bg-amber-100 text-amber-800 border-amber-200", // Amber tone as per HNG
    closed: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    low: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const filters = [
    { id: "all", label: "All Tickets", count: tickets.length },
    {
      id: "open",
      label: "Open",
      count: tickets.filter((t) => t.status === "open").length,
    },
    {
      id: "in_progress",
      label: "In Progress",
      count: tickets.filter((t) => t.status === "in_progress").length,
    },
    {
      id: "closed",
      label: "Closed",
      count: tickets.filter((t) => t.status === "closed").length,
    },
  ];

  const filteredTickets = tickets.filter((ticket) => {
    const matchesFilter =
      activeFilter === "all" || ticket.status === activeFilter;
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.description &&
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleDeleteTicket = (ticketId, ticketTitle) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${ticketTitle}"? This action cannot be undone.`
      )
    ) {
      deleteTicket(ticketId);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-16 h-16 bg-purple-200/30 border-4 border-purple-100 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-200/30 border-4 border-purple-100 rounded-full blur-xl animate-pulse delay-1000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            to="/"
            className="inline-block transform transition-transform hover:scale-105"
          >
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TicketFlow
            </h2>
          </Link>
          <h1 className="mt-4 text-4xl font-bold text-gray-900 tracking-tight">
            Ticket Management
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Create, view, edit, and manage all your support tickets
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Tickets
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {tickets.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-2xl font-bold text-green-600 mt-1">
                  {tickets.filter((t) => t.status === "open").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-lg">🟢</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">
                  {tickets.filter((t) => t.status === "in_progress").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-lg">🟡</span>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-gray-600 mt-1">
                  {tickets.filter((t) => t.status === "closed").length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-lg">⚫</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search tickets by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Filters and Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Status Filters */}
              <div className="flex bg-gray-100/50 p-1 rounded-xl">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeFilter === filter.id
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {filter.label} ({filter.count})
                  </button>
                ))}
              </div>

              {/* New Ticket Button */}
              <Link
                to="/tickets/create"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-sm hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <span>+</span>
                Create Ticket
              </Link>
            </div>
          </div>
        </div>

        {/* Tickets Grid */}
        {filteredTickets.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 text-center border border-white/20">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🎫</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {tickets.length === 0 ? "No tickets yet" : "No tickets found"}
              </h3>
              <p className="text-gray-600 mb-6">
                {tickets.length === 0
                  ? "Get started by creating your first support ticket."
                  : "Try adjusting your search or filter criteria."}
              </p>
              <Link
                to="/tickets/create"
                className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span className="mr-2">+</span>
                Create Your First Ticket
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 transform transition-all duration-300 hover:scale-102 hover:shadow-lg group"
              >
                {/* Header with Status & Priority */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        statusColors[ticket.status]
                      }`}
                    >
                      {ticket.status === "in_progress"
                        ? "In Progress"
                        : ticket.status}
                    </span>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${
                        priorityColors[ticket.priority]
                      }`}
                    >
                      {ticket.priority} Priority
                    </span>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-gray-400">→</span>
                  </div>
                </div>

                {/* Ticket Content */}
                <Link to={`/tickets/${ticket.id}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {ticket.title}
                  </h3>

                  {ticket.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {ticket.description}
                    </p>
                  )}
                </Link>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>
                    Created {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                  {ticket.updatedAt !== ticket.createdAt && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      Updated
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-4 border-t border-gray-100">
                  <Link
                    to={`/tickets/${ticket.id}/edit`}
                    className="flex-1 text-center py-2 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDeleteTicket(ticket.id, ticket.title)}
                    className="flex-1 text-center py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
