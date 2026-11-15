"use client";

import Image from "next/image";
import { Pencil, Trash2, Download, FileText } from "lucide-react";
import { formatDate } from "../common/formatDate";
import { Button } from "../ui/button";
import { handleDownload } from "@/hooks/fileDownload";
import { departmentColor } from "@/lib/departmentStyles";

const EmployeeCard = ({
  employee,
  setSelectedEmployee,
  setIsEditModal,
  setIsDeleteModalOpen,
}: any) => {
  const departmentDotColor = departmentColor(employee?.department || "");
  const status = employee?.status || "Active";
  const statusClass =
    status.toLowerCase() === "active"
      ? "status-badge status-success"
      : status.toLowerCase() === "on leave"
        ? "status-badge status-warning"
        : status.toLowerCase() === "inactive"
          ? "status-badge status-danger"
          : "status-badge status-neutral";
  const salary = Number(employee?.salary || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <article className="details-card">
      <header className="details-hero">
        <Image
          src={employee?.profile_image || "/userAvatar.png"}
          alt={employee?.name || "Employee"}
          width={84}
          height={84}
          className="details-avatar"
          sizes="84px"
        />
        <div className="details-identity">
          <div className="details-title-row">
            <h2>{employee?.name}</h2>
            <span className={statusClass}>{status}</span>
          </div>
          <div className="details-contact">
            <span className="department-pill">
              <span className="dot" style={{ backgroundColor: departmentDotColor }} />
              {employee?.department || "N/A"}
            </span>
            <span className="details-email">{employee?.email || "N/A"}</span>
          </div>
        </div>

        <div className="details-actions">
          <Button
            type="button"
            onClick={() => {
              setSelectedEmployee(employee);
              setIsEditModal(true);
            }}
            className="h-11 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 text-[var(--text)] hover:bg-[var(--surface-2)]"
          >
            <Pencil aria-hidden="true" />
            Edit
          </Button>
          <Button
            type="button"
            onClick={() => setIsDeleteModalOpen(true)}
            className="h-11 rounded-full bg-[var(--danger-bg)] px-5 text-[var(--danger-text)] hover:opacity-80"
          >
            <Trash2 aria-hidden="true" />
            Delete
          </Button>
        </div>
      </header>

      <div className="details-tab" aria-label="Employee details sections">
        <span>Overview</span>
      </div>

      <div className="details-content">
        <section className="details-stats" aria-label="Employee overview">
          <div>
            <span>Salary</span>
            <strong>${salary}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className="text-success">Active</strong>
          </div>
          <div>
            <span>Department</span>
            <strong>{employee?.department || "N/A"}</strong>
          </div>
        </section>

        <section className="details-fields" aria-label="Employee details">
          <div>
            <span>Email Address</span>
            <strong className="break-all">{employee?.email || "N/A"}</strong>
          </div>
          <div>
            <span>Department</span>
            <strong>{employee?.department || "N/A"}</strong>
          </div>
          <div>
            <span>Salary</span>
            <strong>${salary}</strong>
          </div>
          <div>
            <span>Join Date</span>
            <strong>{formatDate(employee?.created_at) || "N/A"}</strong>
          </div>
          <div>
            <span>Employee ID</span>
            <strong>#{String(employee?.id).padStart(4, "0")}</strong>
          </div>
        </section>

        {employee?.employee_file && (
          <section className="document-card">
            <div className="document-header">
              <div className="document-heading">
                <span className="document-icon">
                  <FileText size={18} aria-hidden="true" />
                </span>
                <span>
                  <strong>Employee Document</strong>
                  <small>Preview the uploaded document or download it.</small>
                </span>
              </div>
              <Button
                type="button"
                onClick={() => handleDownload(employee.employee_file)}
                className="h-10 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text)] hover:bg-[var(--surface-2)]"
              >
                <Download aria-hidden="true" />
                Download
              </Button>
            </div>
            <div className="document-preview">
              <iframe
                src={`${employee.employee_file}#toolbar=0&navpanes=0&scrollbar=0`}
                title="Employee Document"
              />
            </div>
          </section>
        )}
      </div>
    </article>
  );
};

export default EmployeeCard;
