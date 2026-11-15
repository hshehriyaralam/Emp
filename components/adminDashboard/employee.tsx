"use client";
import { UsersRound } from "lucide-react";
import EmployeeTable from "./employeTable";
import EmployeeCard from "./employeeCard";

const Employee = ({ filteredEmployees, isLoading, error, viewMode, setIsModalOpen }: any) => {
  if (isLoading) {
    return (
      <div className="table-card">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="table-row skeleton-row" aria-hidden="true">
            <div className="table-cell"><div className="skeleton-line skeleton-employee" /></div>
            <div className="table-cell"><div className="skeleton-line skeleton-department" /></div>
            <div className="table-cell"><div className="skeleton-line skeleton-email" /></div>
            <div className="table-cell"><div className="skeleton-line skeleton-salary" /></div>
            <div className="table-cell"><div className="skeleton-line skeleton-date" /></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="table-card empty-state">
        <span className="empty-state-icon" aria-hidden="true"><UsersRound size={26} /></span>
        <h3>Failed to Load Employees</h3>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }

  if (filteredEmployees?.length === 0) {
    return (
      <div className="table-card empty-state">
        <span className="empty-state-icon" aria-hidden="true"><UsersRound size={26} /></span>
        <h3>No Employees Found</h3>
        <button type="button" onClick={() => setIsModalOpen(true)} className="primary-button">
          Add Employee
        </button>
      </div>
    );
  }

  if (viewMode === "grid") return <EmployeeCard filteredEmployees={filteredEmployees} />;

  return <EmployeeTable filteredEmployees={filteredEmployees} />;
};

export default Employee;