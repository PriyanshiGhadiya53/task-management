import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import TaskForm from "../Components/TaskForm";
import TaskList from "../Components/TaskList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaChartPie,
  FaCalendarAlt,
  FaListUl,
  FaPlus,
} from "react-icons/fa";
import Footer from "../Components/Footer";

function Dashboard() {
  const navigate = useNavigate();

  // ================= STATES =================
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");
  const [user, setUser] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");

  const [editTaskId, setEditTaskId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/task/mytasks`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.status === 401) {
      navigate("/login", { replace: true });
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    setTasks(data.data);
  } catch (error) {
    console.log(error);
    toast.error("Unable to fetch tasks");
  } finally {
    setLoading(false);
  }
};

  const fetchCurrentUser = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}api/v1/user/me`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (response.status === 401) {
      navigate("/login", { replace: true });
      return;
    }

    const data = await response.json();

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    setUser(data.data);
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
    fetchTasks();
    fetchCurrentUser();
  }, []);

  // ================= CREATE / UPDATE =================
  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      let url = `${import.meta.env.VITE_API_URL}/api/v1/task/create`;
      let method = "POST";

      if (editTaskId) {
        url = `${import.meta.env.VITE_API_URL}/api/v1/task/update/${editTaskId}`;
        method = "PATCH";
      }

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          description,
          status,
          dueDate,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(
        editTaskId
          ? "Task Updated Successfully"
          : "Task Created Successfully"
      );

      setTitle("");
      setDescription("");
      setStatus("pending");
      setDueDate("");
      setEditTaskId(null);

      fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // ================= DELETE =================
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/task/delete/${taskId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("Task Deleted Successfully");

      fetchTasks();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // ================= EDIT =================
  const handleEdit = (task) => {
    setEditTaskId(task._id);

    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);

    setDueDate(
      task.dueDate
        ? new Date(task.dueDate).toISOString().split("T")[0]
        : ""
    );
  };

  // ================= LOGOUT =================
  const handleLogout = async () => {
  console.log("1. Logout Clicked");

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/user/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    console.log("2. Logout response:", response.status);

    const data = await response.json();

    console.log("3. Logout data:", data);

    if (!response.ok) {
      toast.error(data.message || "Logout failed");
      return;
    }

    console.log("4. Logout successful");

    setUser(null);

    toast.success("Logout Successful");

    navigate("/", { replace: true });

  } catch (error) {
    console.error("5. Logout Error:", error);
    toast.error("Something went wrong");
  }
};
  // ================= DASHBOARD COUNTS =================
  const pendingTasks = tasks.filter(
    (task) => task.status === "pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "inprogress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "completed"
  ).length;

  const totalTasksCount = tasks.length || 1; // Prevent division by 0

  // Percentage calculation for SVG Pie/Donut Chart
  const pendingPct = Math.round((pendingTasks / totalTasksCount) * 100);
  const inProgressPct = Math.round((inProgressTasks / totalTasksCount) * 100);
  const completedPct = Math.round((completedTasks / totalTasksCount) * 100);

  // ================= FILTER & SORT =================
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase()) ||
        task.status.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || task.status === filterStatus;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "latest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === "dueDate") return new Date(a.dueDate || 0) - new Date(b.dueDate || 0);
      if (sortBy === "status") return a.status.localeCompare(b.status);
      return 0;
    });

  // Upcoming non-completed tasks sorted by due date
  const upcomingTasks = tasks
    .filter((task) => task.status !== "completed" && task.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // ================= DELETE MODAL =================
  const openDeleteModal = (taskId) => {
    setDeleteTaskId(taskId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    await handleDeleteTask(deleteTaskId);
    setShowDeleteModal(false);
    setDeleteTaskId(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navbar */}
      <Navbar
        username={user?.username}
        search={search}
        setSearch={setSearch}
        handleLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          
          {/* Pending Card */}
          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm dark:shadow-lg hover:border-amber-500/50 transition-all duration-300">
            <div>
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                🟡 Pending
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {pendingTasks}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tasks waiting to start</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 dark:text-amber-400">
              <FaClock className="text-2xl" />
            </div>
          </div>

          {/* In Progress Card */}
          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm dark:shadow-lg hover:border-blue-500/50 transition-all duration-300">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                🔵 In Progress
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {inProgressTasks}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Currently working</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 dark:text-blue-400">
              <FaSpinner className="text-2xl animate-spin" />
            </div>
          </div>

          {/* Completed Card */}
          <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex items-center justify-between shadow-sm dark:shadow-lg hover:border-emerald-500/50 transition-all duration-300">
            <div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                🟢 Completed
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {completedTasks}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Successfully finished</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 dark:text-emerald-400">
              <FaCheckCircle className="text-2xl" />
            </div>
          </div>

        </div>

        {/* Main Split Grid: Left (Tasks + Form) | Right (Overview Analytics) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: My Tasks List (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Task Controls Header */}
            <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FaListUl className="text-blue-500 dark:text-blue-400" /> My Tasks
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Showing {filteredTasks.length} of {tasks.length} tasks
                </p>
              </div>

              {/* Filters & Sort */}
              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-blue-500"
                >
                  <option value="all">📋 All Status</option>
                  <option value="pending">🟡 Pending</option>
                  <option value="inprogress">🔵 In Progress</option>
                  <option value="completed">🟢 Completed</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 outline-none focus:border-blue-500"
                >
                  <option value="latest">Sort: Latest First</option>
                  <option value="oldest">Sort: Oldest First</option>
                  <option value="dueDate">Sort: Due Date</option>
                  <option value="status">Sort: Status</option>
                </select>
              </div>
            </div>

            {/* Task List Component */}
            <div className="bg-white/60 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 sm:p-6 min-h-[300px] transition-colors">
              <TaskList
                tasks={filteredTasks}
                openDeleteModal={openDeleteModal}
                handleEdit={handleEdit}
              />
            </div>

            {/* Create / Edit Task Form Section */}
            <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl transition-colors">
              <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <FaPlus className="text-sm" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {editTaskId ? "✏️ Edit Task" : "➕ Create New Task"}
                </h3>
              </div>

              <TaskForm
                title={title}
                setTitle={setTitle}
                description={description}
                setDescription={setDescription}
                status={status}
                setStatus={setStatus}
                dueDate={dueDate}
                setDueDate={setDueDate}
                handleCreateTask={handleCreateTask}
                editTaskId={editTaskId}
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Task Overview & Analytics (Span 1) */}
          <div className="space-y-6">
            
            {/* Task Overview / Pie Chart Card */}
            <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl transition-colors">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-5">
                <FaChartPie className="text-indigo-500 dark:text-indigo-400" /> Task Overview
              </h3>

              {/* Conic Gradient SVG Donut Chart */}
              <div className="flex flex-col items-center justify-center my-4">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-full transition-all duration-500"
                    style={{
                      background: `conic-gradient(
                        #f59e0b 0% ${pendingPct}%, 
                        #3b82f6 ${pendingPct}% ${pendingPct + inProgressPct}%, 
                        #10b981 ${pendingPct + inProgressPct}% 100%
                      )`,
                    }}
                  />
                  <div className="absolute inset-4 bg-white dark:bg-slate-900 rounded-full flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800 transition-colors">
                    <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                      {tasks.length}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Total Tasks</span>
                  </div>
                </div>
              </div>

              {/* Progress Distribution Details */}
              <div className="space-y-3 mt-6 border-t border-slate-200 dark:border-slate-800/80 pt-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Pending
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {pendingTasks} ({pendingPct}%)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    In Progress
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {inProgressTasks} ({inProgressPct}%)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    Completed
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {completedTasks} ({completedPct}%)
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Tasks Widget */}
            <div className="bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm dark:shadow-xl transition-colors">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
                <FaCalendarAlt className="text-cyan-600 dark:text-cyan-400" /> Upcoming Tasks
              </h3>

              {upcomingTasks.length === 0 ? (
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-4">
                  No upcoming tasks scheduled
                </p>
              ) : (
                <div className="space-y-3">
                  {upcomingTasks.map((task) => (
                    <div
                      key={task._id}
                      className="p-3 bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/50 rounded-xl flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <div className="truncate pr-2">
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                          • {task.title}
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Status: <span className="capitalize">{task.status}</span>
                        </p>
                      </div>
                      <span className="text-[10px] bg-white dark:bg-slate-950 text-cyan-600 dark:text-cyan-400 font-mono px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-800 whitespace-nowrap">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 transition-colors">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Delete Task</h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
              Are you sure you want to delete this task? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>

    
  );
  

}

export default Dashboard;