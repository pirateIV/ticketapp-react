import React from "react";
import { Link } from "react-router-dom";

export function TicketCard({ ticket }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusConfig = (status) => {
    const config = {
      open: { color: "green", label: "Open", emoji: "🟢" },
      in_progress: { color: "yellow", label: "In Progress", emoji: "🟡" },
      closed: { color: "gray", label: "Closed", emoji: "⚫" },
    };
    return config[status] || config.open;
  };

  const getPriorityConfig = (priority) => {
    const config = {
      low: { color: "green", label: "Low" },
      medium: { color: "yellow", label: "Medium" },
      high: { color: "red", label: "High" },
    };
    return config[priority] || config.medium;
  };

  const statusConfig = getStatusConfig(ticket.status);
  const priorityConfig = getPriorityConfig(ticket.priority);

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-white/20 group">
      <Link to={`/tickets/${ticket.id}`} className="block p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-${statusConfig.color}-100 text-${statusConfig.color}-800`}
            >
              {statusConfig.emoji} {statusConfig.label}
            </span>
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-${priorityConfig.color}-100 text-${priorityConfig.color}-800`}
            >
              {priorityConfig.label} Priority
            </span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <span className="text-gray-400 hover:text-gray-600">→</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {ticket.title}
        </h3>

        {/* Description */}
        {ticket.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {ticket.description}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-4">
            <span>Created {formatDate(ticket.createdAt)}</span>
            {ticket.updatedAt !== ticket.createdAt && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                Updated
              </span>
            )}
          </div>

          {/* Assigned User Avatar */}
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
            {ticket.createdBy?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
        </div>

        {/* Progress Bar for In Progress Tickets */}
        {ticket.status === "in_progress" && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Progress</span>
              <span>60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: "60%" }}
              ></div>
            </div>
          </div>
        )}
      </Link>

      {/* Action Buttons */}
      <div className="px-6 pb-4 flex space-x-2">
        <Link
          to={`/tickets/${ticket.id}/edit`}
          className="flex-1 text-center py-2 px-3 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
        >
          Edit
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            // Handle delete with confirmation
            if (
              window.confirm("Are you sure you want to delete this ticket?")
            ) {
              // Delete ticket logic
            }
          }}
          className="flex-1 text-center py-2 px-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
