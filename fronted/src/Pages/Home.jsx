import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        
        <h1 className="text-2xl font-bold">
          Task<span className="text-blue-500">Manager</span>
        </h1>

        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Register
          </Link>
        </div>

      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center text-center min-h-[80vh] px-4">

        <h2 className="text-5xl font-bold mb-5">
          Manage Your Tasks
          <span className="text-blue-500"> Easily</span>
        </h2>

        <p className="text-slate-400 max-w-xl mb-8">
          Organize your tasks, track your progress and complete your work
          efficiently with TaskManager.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold"
          >
            Get Started
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 border border-slate-700 hover:bg-slate-800 rounded-xl font-semibold"
          >
            Create Account
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Home;