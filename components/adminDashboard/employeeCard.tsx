import Image from "next/image";
import Link from "next/link";
import { departmentColor, avatarPalette } from "@/lib/departmentStyles";

const EmployeeCard = ({ filteredEmployees }: any) => (
  <div className="employee-grid">
    {filteredEmployees?.map((employee: any) => (
      <Link
        key={employee.id}
        href={`/admin-employees/${employee.id}`}
        className="employee-card"
      >
        <div className="employee-card-top">
          {employee?.profile_image ? (
            <Image
              src={employee.profile_image}
              alt=""
              width={56}
              height={56}
              className="employee-card-avatar"
              sizes="56px"
            />
          ) : (
            <span className="employee-card-avatar avatar-initials" style={avatarPalette(employee.name)}>
              {employee.name?.split(" ").map((part: string) => part[0]).slice(0, 2).join("").toUpperCase()}
            </span>
          )}
        </div>
        <h2 className="employee-card-name">{employee.name}</h2>
        <p className="employee-card-email" title={employee.email}>{employee.email}</p>
        <div className="employee-card-meta">
          <span className="department-pill">
            <span className="dot" style={{ backgroundColor: departmentColor(employee.department) }} />
            <span className="department-name">{employee.department || "N/A"}</span>
          </span>
          <span className="employee-card-salary">
            ${Number(employee.salary || 0).toLocaleString("en-US", { maximumFractionDigits: 0 })}
          </span>
        </div>
      </Link>
    ))}
  </div>
);

export default EmployeeCard;
