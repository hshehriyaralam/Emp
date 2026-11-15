
const Stats = ({ stats }: any) => {
  return (
    <div className="stat-strip">
      <div className="stat-item">
        <span className="stat-label">Total Employees</span>
        <span className="stat-value">{stats.total}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Departments</span>
        <span className="stat-value">{stats.departments}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Avg. Salary</span>
        <span className="stat-value">${stats.avgSalary.toLocaleString()}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Highest Salary</span>
        <span className="stat-value">${stats.maxSalary.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default Stats;
