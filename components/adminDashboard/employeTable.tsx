"use client";

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "../common/formatDate";
import { departmentColor, avatarPalette } from "@/lib/departmentStyles";

const EmployeeTable = ({ filteredEmployees }: any) => {
  const maxSalary = filteredEmployees.reduce(
    (max: number, employee: any) => Math.max(max, Number(employee.salary || 0)),
    0,
  );

  return (
    <div className="table-card" role="table" aria-label="Employees">
      <div className="table-header" role="row">
        <div className="table-header-cell" role="columnheader">Employee</div>
        <div className="table-header-cell" role="columnheader">Department</div>
        <div className="table-header-cell" role="columnheader">Email</div>
        <div className="table-header-cell" role="columnheader">Salary</div>
        <div className="table-header-cell" role="columnheader">Joined</div>
      </div>

      {filteredEmployees?.map((employee: any) => {
        const salary = Number(employee.salary || 0);
        const progress = maxSalary ? Math.min((salary / maxSalary) * 100, 100) : 0;

        return (
          <Link
            key={employee.id}
            href={`/admin-employees/${employee.id}`}
            className="table-row"
            role="row"
            aria-label={`View ${employee.name}`}
          >
            <div className="table-cell" role="cell">
              <div className="employee-wrap">
                {employee?.profile_image ? (
                  <Image
                    src={employee.profile_image}
                    alt=""
                    width={36}
                    height={36}
                    className="employee-avatar"
                    sizes="36px"
                  />
                ) : (
                  <div className="employee-avatar avatar-initials" style={avatarPalette(employee.name)}>
                    {employee.name?.split(" ").map((part: string) => part[0]).slice(0, 2).join("").toUpperCase()}
                  </div>
                )}
                <div className="employee-copy">
                  <p className="employee-name">{employee.name}</p>
                  <p className="employee-email mobile-email">{employee.email}</p>
                </div>
              </div>
            </div>

            <div className="table-cell department-cell" role="cell">
              <span className="department-pill">
                <span className="dot" style={{ backgroundColor: departmentColor(employee.department) }} />
                {employee.department || "N/A"}
              </span>
            </div>

            <div className="table-cell email-cell" role="cell">
              <span className="employee-email">{employee.email || "N/A"}</span>
            </div>

            <div className="table-cell salary-cell" role="cell">
              <div className="salary-block">
                <div className="progress-bar" aria-label={`${employee.name} salary bar`}>
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <span className="salary-value">
                  ${salary.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="table-cell joined-cell" role="cell">{formatDate(employee?.created_at) || "N/A"}</div>
          </Link>
        );
      })}
    </div>
  );
};

export default EmployeeTable;
