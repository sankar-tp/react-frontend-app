
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ListTodo,
  CirclePlus,
  Settings,
  CheckCircle2,
  X,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", path: "/", icon: LayoutDashboard },
  { label: "Tasks", path: "/tasks", icon: ListTodo },
  { label: "Create Task", path: "/create-task", icon: CirclePlus },
  { label: "Settings", path: "/settings", icon: Settings },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <aside
      id="app-sidebar"
      className={`sidebar ${isOpen ? "sidebar-open" : ""}`}
    >
      <div className="sidebar-brand">
        <CheckCircle2 size={26} />
        <span>TaskFlow</span>

        <button
          type="button"
          className="sidebar-close"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav" aria-label="Main navigation">
        {menuItems.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            onClick={onClose}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
