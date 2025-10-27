// components/tickets/EmptyState.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export function EmptyState ({ hasTickets, filters, onClearFilters })  {
  if (hasTickets) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-white/20">
        <div className="max-w-md mx-auto">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No tickets found</h3>
          <p className="text-gray-600 mb-6">
            No tickets match your current filters. Try adjusting your search criteria.
          </p>
          <button
            onClick={onClearFilters}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-white/20">
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">🎫</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">No tickets yet</h3>
        <p className="text-gray-600 mb-6">
          Get started by creating your first support ticket. Track issues, assign tasks, and manage your workflow efficiently.
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
  );
};
