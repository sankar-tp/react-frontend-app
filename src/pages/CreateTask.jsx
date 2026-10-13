
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

const taskSchema = z.object({
  title: z.string().trim().min(3, "Title must contain at least 3 characters"),
  description: z.string().trim().min(10, "Description must contain at least 10 characters"),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().min(1, "Please select a due date").refine(
    (value) => value >= new Date().toLocaleDateString("en-CA"),
    "Due date cannot be in the past"
  ),
});

function CreateTask() {
  const navigate = useNavigate();
  const { addTask } = useTasks();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
    },
  });

  function onSubmit(data) {
    addTask(data);
    navigate("/tasks");
  }

  return (
    <div className="create-task-page">
      <div className="page-heading">
        <h2>Create Task</h2>
        <p>Add a new task to your workspace.</p>
      </div>

      <form
        className="task-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            id="title"
            type="text"
            placeholder="Enter task title"
            aria-invalid={!!errors.title}
            {...register("title")}
          />
          {errors.title && (
            <span className="form-error" role="alert">
              {errors.title.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            rows="4"
            placeholder="Describe your task"
            aria-invalid={!!errors.description}
            {...register("description")}
          />
          {errors.description && (
            <span className="form-error" role="alert">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="priority">Priority *</label>
            <select id="priority" {...register("priority")}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <span className="form-error" role="alert">
                {errors.priority.message}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date *</label>
            <input
              id="dueDate"
              type="date"
              aria-invalid={!!errors.dueDate}
              {...register("dueDate")}
            />
            {errors.dueDate && (
              <span className="form-error" role="alert">
                {errors.dueDate.message}
              </span>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/tasks")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="btn-primary"
            disabled={isSubmitting}
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateTask;
