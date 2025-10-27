import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import Logo from "./Logo";

export default function Nav() {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="px-6 w-full z-10 fixed top-0 left-0">
      <nav className="flex items-center justify-between max-w-5xl mx-auto ps-5 pe-2 py-1.5 border border-gray-400 bg-white outline-4 outline-white/40 rounded-full mt-2  w-full z-5">
        <Link to="/"><Logo className="text-gray-900" /></Link>

        <ul className="flex items-center gap-x-5 text-sm font-medium">
          {!isAuthenticated ? (
            <>
              <li>
                <Link to="/auth/login">Login</Link>
              </li>
              <li>
                <Link to="/auth/signup">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button
                  className="bg-gray-900 text-white py-2 px-3 rounded-full"
                  onClick={() => {
                    logout();
                    window.location.reload();
                  }}
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
