
import {
  ClipboardList,
  CheckCircle2,
  Clock3,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { useTasks } from "../context/TaskContext";
import StatCard from "../components/StatCard";

const COLORS = ["#2563eb", "#f59e0b"];

function Dashboard() {
  const { tasks, loading, error } = useTasks();
  const navigate = useNavigate();

  const total = tasks.length;
  const completed = tasks.filter((task) => task.completed).length;
  const pending = total - completed;

  const completionRate = total
    ? Math.round((completed / total) * 100)
    : 0;

  const pieData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
  ];

  const barData = [
    { name: "Completed", tasks: completed },
    { name: "Pending", tasks: pending },
  ];

  const recentTasks = [...tasks].slice(0, 5);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p role="alert">Error: {error}</p>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-heading">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Track your tasks and overall progress.</p>
        </div>

        <button
          className="btn-primary"
          onClick={() => navigate("/create-task")}
        >
          + Create Task
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Tasks"
          value={total}
          icon={ClipboardList}
          color="blue"
        />

        <StatCard
          title="Completed Tasks"
          value={completed}
          icon={CheckCircle2}
          color="green"
        />

        <StatCard
          title="Pending Tasks"
          value={pending}
          icon={Clock3}
          color="orange"
        />

        <StatCard
          title="Completion Rate"
          value={`${completionRate}%`}
          icon={TrendingUp}
          color="purple"
        />
      </div>

      <div className="dashboard-charts">
        <section className="chart-card">
          <div className="chart-heading">
            <h3>Task Completion</h3>
            <p>Distribution of completed and pending tasks</p>
          </div>

          {total === 0 ? (
            <p className="chart-empty">No task data available.</p>
          ) : (
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={entry.name}
                        fill={COLORS[index]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        <section className="chart-card">
          <div className="chart-heading">
            <h3>Task Status Overview</h3>
            <p>Completed vs pending tasks</p>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar
                  dataKey="tasks"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={70}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>

      <section className="recent-tasks-card">
        <div className="recent-tasks-header">
          <div>
            <h3>Recent Tasks</h3>
            <p>A quick overview of your tasks</p>
          </div>

          <button
            className="view-all-button"
            onClick={() => navigate("/tasks")}
          >
            View All <ArrowRight size={16} />
          </button>
        </div>

        {recentTasks.length === 0 ? (
          <p className="chart-empty">No tasks available.</p>
        ) : (
          <div className="recent-task-list">
            {recentTasks.map((task) => (
              <div className="recent-task-item" key={task.id}>
                <div className="recent-task-info">
                  <span
                    className={
                      task.completed
                        ? "recent-task-dot completed"
                        : "recent-task-dot pending"
                    }
                  />

                  <span>{task.todo}</span>
                </div>

                <span
                  className={
                    task.completed
                      ? "recent-status completed"
                      : "recent-status pending"
                  }
                >
                  {task.completed ? "Completed" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
