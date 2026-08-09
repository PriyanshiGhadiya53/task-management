import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaCheckSquare,
  FaSun,
  FaMoon,
} from "react-icons/fa";

function Navbar({ username, search, setSearch, handleLogout }) {
  // Theme state initialized with saved theme or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return true;
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Effect to toggle 'dark' class on <html> element
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  // Sub-component for Theme Toggle Button
  const ThemeToggleBtn = () => (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-amber-500 dark:text-blue-400 border border-slate-200 dark:border-slate-800 transition duration-200 active:scale-95"
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
      aria-label="Toggle Theme"
    >
      {isDarkMode ? <FaSun className="text-base" /> : <FaMoon className="text-base text-slate-700" />}
    </button>
  );

  // Sub-component for User Badge
  const UserBadge = () => (
    <div className="flex items-center gap-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3.5 py-1.5 rounded-xl">
      <FaUserCircle className="text-lg text-blue-500 dark:text-blue-400" />
      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
        {username || "User"}
      </span>
    </div>
  );

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand / Logo */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <FaCheckSquare className="text-lg" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              Task<span className="text-blue-500">Manager</span>
            </h1>
          </div>

          {/* User badge + Toggle (Mobile view) */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggleBtn />
            <UserBadge />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 text-sm pointer-events-none" />
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggleBtn />
          <UserBadge />
          <button
            onClick={()=>{
    console.log("Logout Clicked");
    handleLogout();
  }}
            className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition duration-200 active:scale-95"
          >
            <FaSignOutAlt className="text-xs" />
            Logout
          </button>
        </div>

        {/* Mobile Logout Button */}
        <button
          onClick={handleLogout}
          className="flex md:hidden items-center justify-center gap-2 w-full bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-semibold transition"
        >
          <FaSignOutAlt className="text-xs" />
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;