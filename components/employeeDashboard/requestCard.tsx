"use client";

import {
  User,
  Briefcase,
  Calendar,
  Mail,
  Building2,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  Download,
} from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import CreateEmployeeReq from "./createEmployeeReq";
import { useAddEmployeeReqMutation } from "@/store/employeeApi";
import { formatDate } from "../common/formatDate";
import React from "react";
import { handleDownload } from "@/hooks/fileDownload";

const requestStatusStyles: Record<string, { icon: typeof Clock; className: string }> = {
  Pending: { icon: Clock, className: "request-status-pending" },
  Approved: { icon: CheckCircle, className: "request-status-approved" },
  Rejected: { icon: XCircle, className: "request-status-rejected" },
};

const RequestCard = ({
  employeeReq,
  Profile,
  setIsModalOpen,
  isModalOpen,
}: any) => {
  const requestStatus = employeeReq?.status || null;
  const [addEmployeeReq, { isLoading: Adding }] = useAddEmployeeReqMutation();
  const statusInfo = requestStatus ? requestStatusStyles[requestStatus] : null;
  const StatusIcon = statusInfo?.icon;
  const employeeName = employeeReq?.name || "Employee";
  const firstName = employeeName.split(" ")[0];
  const salary = Number(employeeReq?.salary || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="mx-auto max-w-7xl">
      {requestStatus !== "Pending" &&
        requestStatus !== "Approved" &&
        requestStatus !== "Rejected" && (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="mb-6 flex h-11 cursor-pointer items-center gap-2 rounded-full bg-[var(--primary)] px-6 font-semibold text-[var(--on-primary)] hover:bg-[var(--primary-hover)]"
          >
            <Plus className="h-4 w-4" />
            <span>Add Employee</span>
          </Button>
        )}

      <header className="mb-6">
        <h1 className="page-title">Hello, {firstName}</h1>
        <p className="page-subtitle">Here&apos;s your profile overview</p>
      </header>

      {statusInfo && StatusIcon && (
        <section className={`request-status-banner ${statusInfo.className}`} role="status">
          <div className="request-status-copy">
            <span className="request-status-icon">
              <StatusIcon size={20} aria-hidden="true" />
            </span>
            <span>
              <strong>Request Status</strong>
              <small>Your request status is {requestStatus?.toLowerCase()}.</small>
            </span>
          </div>
          <span className="status-badge">{requestStatus}</span>
        </section>
      )}

      <div className="employee-dashboard-grid">
        <section className="employee-info-card">
          <h2>Profile Details</h2>
          <div className="employee-info-rows">
            {[
              { icon: User, label: "Full Name", value: employeeReq?.name },
              { icon: Mail, label: "Email", value: employeeReq?.email },
              { icon: Building2, label: "Department", value: employeeReq?.department },
              { icon: Briefcase, label: "Salary", value: `$${salary}` },
              { icon: Calendar, label: "Submitted On", value: formatDate(employeeReq?.created_at) },
            ].map((item) => (
              <div key={item.label} className="employee-info-row">
                <span>{item.label}</span>
                <strong>{item.value || "N/A"}</strong>
              </div>
            ))}
          </div>
        </section>

        <section className="employee-info-card">
          <h2><AlertCircle size={18} aria-hidden="true" /> Account Status</h2>
          <div className="employee-account">
            <div className="employee-account-summary">
              <Image
                src={employeeReq?.profile_image || "/userAvatar.png"}
                alt=""
                width={84}
                height={84}
                className="employee-account-avatar"
                sizes="84px"
              />
              <strong>{employeeReq?.name || "N/A"}</strong>
              <span>{employeeReq?.email || "N/A"}</span>
            </div>
            <div className="employee-account-rows">
              <div><span>Department</span><strong>{employeeReq?.department || "N/A"}</strong></div>
              <div><span>Salary</span><strong>${salary}</strong></div>
              <div>
                <span>Status</span>
                {requestStatus && (
                  <strong className={`status-badge ${statusInfo?.className}`}>
                    {requestStatus}
                  </strong>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {employeeReq.employee_file && (
        <section className="document-card mt-6">
          <div className="document-header">
            <div className="document-heading">
              <span className="document-icon"><FileText size={18} aria-hidden="true" /></span>
              <span>
                <strong>Employee Document</strong>
                <small>Preview the uploaded document or download it.</small>
              </span>
            </div>
            <Button
              onClick={() => handleDownload(employeeReq.employee_file)}
              className="flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-[var(--text)] hover:bg-[var(--surface-2)]"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
          <div className="document-preview">
            <iframe
              src={`${employeeReq.employee_file}#toolbar=0&navpanes=0&scrollbar=0`}
              title="Employee Document"
            />
          </div>
        </section>
      )}

      {isModalOpen && (
        <CreateEmployeeReq
          setIsModalOpen={setIsModalOpen}
          addEmployeeReq={addEmployeeReq}
          isLoading={Adding}
          data={Profile}
        />
      )}
    </div>
  );
};

export default React.memo(RequestCard);
