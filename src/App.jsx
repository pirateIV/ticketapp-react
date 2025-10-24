import { Route, Routes } from "react-router-dom";

import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

export default function App() {
  return (
    <Routes>
      <Route path="/" index element={<Landing />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/signup" element={<Signup />} />
			{/* <Route
				path="/dashboard"
				element={
					<Protected>
						<Dashboard />
					</Protected>
				}
			/>
			<Route
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
