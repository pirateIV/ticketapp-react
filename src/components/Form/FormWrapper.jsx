import { Link } from "react-router-dom";
import WavyLine from "../WavyLine";
import Logo from "../Logo";

export function FormWrapper({ children, pageType }) {
  const title = {
    signup: "Create your account",
    login: "Welcome back",
  }[pageType];

  return (
    <div className="relative min-h-120 z-3 flex-1 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-purple-200/30 border-4 border-purple-100 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-200/30 border-4 border-purple-100 rounded-full blur-xl"></div>

      <div className="max-w-md w-full space-y-6 bg-white backdrop-blur-sm rounded-3xl shadow-sm p-8 sm:p-10 relative z-10 border border-gray-400 outline-10 outline-white/30">
        {/* Header */}
        <div className="text-center">
          <h1 className="mt-1 text-3xl font-bold text-gray-900 tracking-tighter">
            {title}
          </h1>
        </div>
        {children}
      </div>
      <WavyLine />
    </div>
  );
}
