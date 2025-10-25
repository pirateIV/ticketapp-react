import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import { useAuth } from "./context/auth";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth/login" />;
};

export default function App() {
  return (
    <Routes>
      <Route path="/" index element={<Landing />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {/* <Dashboard /> */}
            <>This is the Dashboard</>
          </ProtectedRoute>
        }
      />
      {/*<Route
				path="/tickets"
				element={
					<Protected>
						<Tickets />
					</Protected>
				}
			/> */}
    </Routes>
  );
}
