// components/landing/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";
import WavyLine from "../WavyLine";
import { useAuth } from "@/context/auth";

const Hero = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <section className="relative  z-1 flex-1 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute w-80 h-80 -top-40 -right-40 bg-white/10 rounded-full"></div>
      <div className="absolute w-60 h-60 bottom-40 -left-24 bg-white/10 rounded-full"></div>
      <div className="absolute w-40 h-40 top-1/4 left-1/4 bg-white/5 rounded-full"></div>

      <div className="app-container mx-auto px-4 sm:px-6 lg:px-8 pt-20 relative z-10 mt-16 lg:mt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight mb-4">
              Streamline Your Support with{" "}
              <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                TicketFlow
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-blue-100 leading-relaxed mb-6">
              The ultimate ticket management solution for teams of all sizes.
              Track, prioritize, and resolve issues faster than ever before.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/auth/login"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                  >
                    Login to Dashboard
                  </Link>
                  <Link
                    to="/auth/signup"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white border-2 border-white rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Get Started Free
                  </Link>
                </>
              ) : (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-blue-600 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Go to Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Ticket Preview Card */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-300">
              {/* Ticket Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    Open
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                    High Priority
                  </span>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  JD
                </div>
              </div>

              {/* Ticket Content */}
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Implement user authentication system
              </h3>
              <p className="text-gray-600 mb-4">
                Create secure login and registration flow with JWT tokens and
                session management
              </p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Created 2h ago</span>
                  <span>•</span>
                  <span>Due in 2 days</span>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white"></div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-lg"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full shadow-lg"></div>
          </div>
        </div>
      </div>

      {/* Wave Background */}
      <WavyLine />
    </section>
  );
};

export default Hero;
