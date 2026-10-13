
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTasks } from "../context/TaskContext";

function EditTaskModal({ task, onClose }) {
  const { updateTask } = useTasks();

  const [formData, setFormData] = useState({
    todo: task.todo,
    description: task.description || "",
    priority: task.priority || "medium",
    dueDate: task.dueDate || "",
  });

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (formData.todo.trim().length < 3) {
      return;
    }

    updateTask(task.id, {
      ...formData,
      todo: formData.todo.trim(),
    });

    onClose();
  }

  return (
    <div className="modal-overlay">
      <div
        className="edit-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-task-title"
      >
        <div className="modal-header">
          <h2 id="edit-task-title">Edit Task</h2>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">Task Title</label>
            <input
              id="edit-title"
              name="todo"
              value={formData.todo}
              onChange={handleChange}
              minLength={3}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">
              Description
            </label>
            <textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="edit-priority">
                Priority
              </label>
              <select
                id="edit-priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="edit-due-date">
                Due Date
              </label>
              <input
                id="edit-due-date"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
