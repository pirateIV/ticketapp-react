import React from "react";
import { useNavigate } from "react-router-dom";

import { useSession } from "@/context/session";

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useSession();

  return (
    <div className="flex-1 pt-16">
      <h1 className="text-6xl font-semibold tracking-tighter">Dashboard</h1>
      <p>Do my ticketing here... 😊</p>

      <button
        className="bg-gray-900 ml-1.5 px-3 py-1.5 text-white rounded-md text-sm font-medium hover:bg-gray-800"
        onClick={() => {
          logout();
          navigate("/auth/login");
        }}
      >
        Logout
      </button>
    </div>
  );
}
