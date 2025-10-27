import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import Logo from "./Logo";

export default function Nav() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="px-6 w-full z-50 fixed top-0 left-0">
      <nav className="flex items-center justify-between max-w-4xl mx-auto ps-5 pe-2 py-1.5 border border-gray-400 bg-white outline-4 outline-white/40 rounded-lg mt-3 w-full z-5">
        <Link to="/">
          <Logo className="text-gray-900" />
        </Link>

        <ul className="flex items-center gap-x-5 text-sm font-medium">
          {!isAuthenticated ? (
            <>
              <li>
                <Link
                  className="bg-gray-200 text-gray-900 py-2 px-3 rounded-md"
                  to="/auth/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="bg-gray-900 text-white py-2 px-3 rounded-md"
                  to="/auth/signup"
                >
                  Signup
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/tickets">Tickets</Link>
              </li>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  className="bg-gray-900 text-white py-2 px-3 rounded-md"
                  onClick={logout}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
