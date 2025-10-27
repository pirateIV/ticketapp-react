import { useState } from "react";
import { useTickets } from "@/context/tickets";
import { Plus, Search, Ticket, Filter, X, Edit, Trash2 } from "lucide-react";
import TicketModal from "@/components/tickets/TicketModal";
import DeleteConfirmationModal from "@/components/ui/DeleteConfirmationModal";

export default function Tickets() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [deleteTicket, setDeleteTicket] = useState(null);
  const { tickets, isLoading, deleteTicket: deleteTicketAction } = useTickets();

  const statusConfig = {
    open: { 
      color: "bg-green-100 text-green-800 border-green-200",
      label: "Open",
      icon: "🟢"
    },
    in_progress: { 
      color: "bg-amber-100 text-amber-800 border-amber-200",
      label: "In Progress", 
      icon: "🟡"
    },
    closed: { 
      color: "bg-gray-100 text-gray-800 border-gray-200",
      label: "Closed",
      icon: "⚫"
    },
  };

  const priorityConfig = {
    high: { 
      color: "bg-red-100 text-red-800 border-red-200",
      label: "High" 
    },
    medium: { 
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      label: "Medium" 
    },
    low: { 
      color: "bg-gray-100 text-gray-800 border-gray-200",
      label: "Low" 
    },
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
    const matchesFilter = activeFilter === "all" || ticket.status === activeFilter;
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (ticket.description &&
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleEditTicket = (ticket) => {
    setEditingTicket(ticket);
  };

  const handleDeleteClick = (ticket) => {
    setDeleteTicket(ticket);
  };

  const confirmDelete = () => {
    if (deleteTicket) {
      deleteTicketAction(deleteTicket.id);
      setDeleteTicket(null);
    }
  };

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditSuccess = () => {
    setEditingTicket(null);
  };

  const getStatusInfo = (status) => statusConfig[status] || statusConfig.open;
  const getPriorityInfo = (priority) => priorityConfig[priority] || priorityConfig.medium;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-8 px-4 sm:px-6 lg:px-8">
        {/* Background Elements */}
        <div className="absolute top-10 right-10 w-16 h-16 bg-purple-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-12 pt-16">
            <h1 className="text-4xl font-bold text-gray-50 mb-4">
              Ticket Management
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Streamline your support process with efficient ticket tracking
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{tickets.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Ticket className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Open</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {tickets.filter((t) => t.status === "open").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-3xl font-bold text-amber-600 mt-2">
                    {tickets.filter((t) => t.status === "in_progress").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Closed</p>
                  <p className="text-3xl font-bold text-gray-600 mt-2">
                    {tickets.filter((t) => t.status === "closed").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls Section */}
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                  />
                </div>

                {/* Status Filters */}
                <div className="flex bg-gray-100 p-1 rounded-xl">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setActiveFilter(filter.id)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 ${
                        activeFilter === filter.id
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <span>{filter.label}</span>
                      <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {filter.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Create Ticket Button */}
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xs hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Create Ticket
              </button>
            </div>
          </div>

          {/* Tickets Grid */}
          {filteredTickets.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-xs">
              <div className="max-w-md mx-auto">
                <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tickets.length === 0 ? "No tickets yet" : "No tickets found"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {tickets.length === 0
                    ? "Get started by creating your first support ticket."
                    : "Try adjusting your search or filter criteria."}
                </p>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-xs hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  Create Your First Ticket
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTickets.map((ticket) => {
                const statusInfo = getStatusInfo(ticket.status);
                const priorityInfo = getPriorityInfo(ticket.priority);
                
                return (
                  <div
                    key={ticket.id}
                    className="bg-white rounded-2xl p-6 shadow-xs outline-4 outline-white/50 hover:shadow-xl transition-all duration-300 group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusInfo.color}`}>
                          {statusInfo.icon} {statusInfo.label}
                        </span>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${priorityInfo.color}`}>
                          {priorityInfo.label}
                        </span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-1">
                        <button
                          onClick={() => handleEditTicket(ticket)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(ticket)}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {ticket.title}
                      </h3>
                      {ticket.description && (
                        <p className="text-gray-600 w-full text-sm text-wrap whitespace-pre-wrap text-ellipsis line-clamp-3">
                          {ticket.description}
                        </p>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                      <span>
                        {new Date(ticket.createdAt).toLocaleDateString()}
                      </span>
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {ticket.assignee?.charAt(0) || "U"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      <TicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={handleCreateSuccess}
        mode="create"
      />

      {/* Edit Ticket Modal */}
      <TicketModal
        isOpen={!!editingTicket}
        onClose={() => setEditingTicket(null)}
        onSuccess={handleEditSuccess}
        mode="edit"
        ticket={editingTicket}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={!!deleteTicket}
        onClose={() => setDeleteTicket(null)}
        onConfirm={confirmDelete}
        title={deleteTicket?.title}
      />
    </>
  );
}