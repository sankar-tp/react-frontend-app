
import {
  Bell,
  Search,
  CircleUserRound,
  Menu,
} from "lucide-react";

function Header({ onMenuClick }) {
  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          aria-controls="app-sidebar"
        >
          <Menu size={22} />
        </button>

        <div className="header-title">
          <h1>Workspace</h1>
          <p>Manage your tasks efficiently</p>
        </div>
      </div>

      <div className="header-actions">
        <Search size={20} />
        <Bell size={20} />
        <CircleUserRound size={28} />
      </div>
    </header>
  );
}

export default Header;
