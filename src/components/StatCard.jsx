
function StatCard({ title, value, icon: Icon, color = "blue" }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-card-label">{title}</span>
        <div className={`stat-icon stat-icon-${color}`}>
          <Icon size={20} />
        </div>
      </div>

      <strong className="stat-value">{value}</strong>
    </div>
  );
}

export default StatCard;
