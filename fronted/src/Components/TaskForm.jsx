import React from "react";
import { FaCalendarAlt, FaHeading, FaAlignLeft, FaList, FaSave } from "react-icons/fa";

function TaskForm({
  title,
  setTitle,
  description,
  setDescription,
  status,
  setStatus,
  dueDate,
  setDueDate,
  handleCreateTask,
  editTaskId,
}) {
  return (
    <form onSubmit={handleCreateTask} className="space-y-4">
      {/* Title Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
          <FaHeading className="text-blue-500" /> Title
        </label>
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
        />
      </div>

      {/* Description Input */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
          <FaAlignLeft className="text-blue-500" /> Description
        </label>
        <textarea
          placeholder="Add details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-sm border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
        ></textarea>
      </div>

      {/* Grid: Status & Due Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status Dropdown */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
            <FaList className="text-blue-500" /> Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 text-sm border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition cursor-pointer"
          >
            <option value="pending">🟡 Pending</option>
            <option value="inprogress">🔵 In Progress</option>
            <option value="completed">🟢 Completed</option>
          </select>
        </div>

        {/* Due Date Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
            <FaCalendarAlt className="text-blue-500" /> Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 text-sm border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm py-2.5 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.99] transition duration-200 flex items-center justify-center gap-2"
      >
        <FaSave className="text-sm" />
        {editTaskId ? "Update Task" : "Save Task"}
      </button>
    </form>
  );
}

export default TaskForm;