import React from "react";

export default function Logo({ className }) {
  return (
    <h3
      className={`text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${className}`}
    >
      TicketFlow
    </h3>
  );
}
