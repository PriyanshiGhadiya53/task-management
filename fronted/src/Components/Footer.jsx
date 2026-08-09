import React from "react";
import { FaCheckSquare, FaHeart } from "react-icons/fa";

function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t border-zinc-800 py-4 transition-colors">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400">
        
        {/* Brand & Copyright */}
        <div className="flex items-center gap-2 font-semibold text-white">
          <div className="w-6 h-6 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center">
            <FaCheckSquare className="text-xs" />
          </div>
          <span>TaskManager</span>
          <span className="font-normal text-zinc-600">|</span>
          <span className="font-normal text-zinc-400">© {new Date().getFullYear()}</span>
        </div>

        {/* Creator Line */}
        <p className="flex items-center gap-1">
          Made with <FaHeart className="text-red-500 text-[10px]" /> by{" "}
          <span className="font-semibold text-white">
            Priyanshi Ghadiya
          </span>
        </p>

      </div>
    </footer>
  );
}

export default Footer;