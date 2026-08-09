import React from "react";
import { FaClock } from "react-icons/fa";
import TaskCard from "./TaskCard";

function TaskList({ tasks, openDeleteModal, handleEdit }) {
  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3">
          <FaClock className="text-2xl" />
        </div>
        <p className="text-slate-700 dark:text-slate-300 font-semibold text-base">
          No tasks found
        </p>
        <p className="text-slate-500 dark:text-slate-500 text-xs mt-1">
          Create a new task or adjust your search filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          openDeleteModal={openDeleteModal}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
}

export default TaskList;