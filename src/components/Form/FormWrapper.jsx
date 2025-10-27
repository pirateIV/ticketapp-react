import { Link } from "react-router-dom";
import WavyLine from "../WavyLine";

export function FormWrapper({ children, pageType }) {
  const title = {
    signup: "Create your account",
    login: "Welcome back",
  }[pageType];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-purple-200/30 border-4 border-purple-100 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-200/30 border-4 border-purple-100 rounded-full blur-xl"></div>

      <div className="max-w-md w-full space-y-8 bg-white backdrop-blur-sm rounded-3xl shadow-sm p-8 sm:p-10 relative z-10 border border-gray-400 outline-10 outline-white/30">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TicketFlow
            </h2>
          </Link>
          <h1 className="mt-2 text-4xl font-bold text-gray-900 tracking-tighter">
            {title}
          </h1>
        </div>
        {children}
      </div>
      <WavyLine />
    </div>
  );
}
