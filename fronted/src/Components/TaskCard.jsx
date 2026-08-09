import React from "react";
import { FaEdit, FaTrashAlt, FaCalendarAlt } from "react-icons/fa";

function TaskCard({ task, openDeleteModal, handleEdit }) {
  // Helper function for status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "inprogress":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      default:
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm dark:shadow-md hover:border-blue-500/40 transition duration-200">
      <div>
        {/* Header: Title & Status Badge */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
            {task.title}
          </h4>
          <span
            className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border capitalize whitespace-nowrap ${getStatusBadge(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {task.description || "No description provided."}
        </p>
      </div>

      {/* Footer: Date & Actions */}
      <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800/80 pt-3 mt-2">
        <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs font-mono">
          <FaCalendarAlt className="text-blue-500 dark:text-blue-400 text-xs" />
          <span>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : "No Due Date"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleEdit(task)}
            className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 transition active:scale-95"
            title="Edit Task"
          >
            <FaEdit className="text-xs" />
          </button>
          <button
            onClick={() => openDeleteModal(task._id)}
            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 transition active:scale-95"
            title="Delete Task"
          >
            <FaTrashAlt className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;