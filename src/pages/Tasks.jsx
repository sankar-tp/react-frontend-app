
import { useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  Plus,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import EditTaskModal from "../components/EditTaskModal";

function Tasks() {
  const {
    tasks,
    loading,
    error,
    toggleTask,
    deleteTask,
  } = useTasks();

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    const query = search.toLowerCase();

    const matchesSearch =
      task.todo.toLowerCase().includes(query) ||
      (task.description || "").toLowerCase().includes(query);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "completed" && task.completed) ||
      (statusFilter === "pending" && !task.completed);

    const matchesPriority =
      priorityFilter === "all" ||
      task.priority === priorityFilter;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  function handleDelete() {
    if (!deletingTask) return;

    deleteTask(deletingTask.id);
    setDeletingTask(null);
  }

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div className="tasks-page">
      <div className="tasks-page-header">
        <div>
          <h2>All Tasks</h2>
          <p>Manage and track your tasks.</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => navigate("/create-task")}
        >
          <Plus size={17} />
          Add Task
        </button>
      </div>

      <div className="task-toolbar">
        <div className="task-search">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search tasks..."
            aria-label="Search tasks"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          aria-label="Filter by status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <select
          aria-label="Filter by priority"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div className="task-results">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </div>

      {filteredTasks.length === 0 ? (
        <div className="task-empty">
          <h3>No tasks found</h3>
          <p>Try changing your search or filters.</p>
        </div>
      ) : (
        <div className="task-list">
          {filteredTasks.map((task) => (
            <div className="task-card" key={task.id}>
              <div className="task-card-top">
                <button
                  type="button"
                  className="task-complete-button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={
                    task.completed
                      ? "Mark task as pending"
                      : "Mark task as completed"
                  }
                >
                  {task.completed ? (
                    <CheckCircle2 size={21} />
                  ) : (
                    <Circle size={21} />
                  )}
                </button>

                <div className="task-card-actions">
                  <button
                    type="button"
                    onClick={() => setEditingTask(task)}
                    aria-label={`Edit ${task.todo}`}
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeletingTask(task)}
                    aria-label={`Delete ${task.todo}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className={task.completed ? "task-done" : ""}>
                {task.todo}
              </h3>

              {task.description && (
                <p className="task-description">
                  {task.description}
                </p>
              )}

              <div className="task-card-footer">
                <span
                  className={
                    task.completed
                      ? "status-completed"
                      : "status-pending"
                  }
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>

                {task.priority && (
                  <span className={`priority-${task.priority}`}>
                    {task.priority}
                  </span>
                )}
              </div>

              {task.dueDate && (
                <p className="task-due-date">
                  Due: {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
                    "en-GB",
                    {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    }
                    )}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {editingTask && (
        <EditTaskModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}

      {deletingTask && (
        <div className="modal-overlay">
          <div
            className="delete-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            aria-describedby="delete-description"
          >
            <h3 id="delete-title">Delete Task?</h3>

            <p id="delete-description">
              Are you sure you want to delete
              "{deletingTask.todo}"? This action cannot
              be undone.
            </p>

            <div className="form-actions">
              <button
                className="btn-secondary"
                onClick={() => setDeletingTask(null)}
              >
                Cancel
              </button>

              <button
                className="btn-danger"
                onClick={handleDelete}
              >
                Delete Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tasks;
