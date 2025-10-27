import { Route, Routes } from "react-router-dom";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Tickets from "@/pages/Tickets";
import { ProtectedRoute } from "@/routes/ProtectedRoute";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Routes>
        <Route path="/" index element={<Landing />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute>
              <Tickets />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
