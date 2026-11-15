"use client";
import { Bell, Building2, CheckCircle, Clock, DollarSign, Mail, X, FileText, Download } from "lucide-react";
import Image from "next/image";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import { handleDownload } from "@/hooks/fileDownload";
import React from "react";

const CardContent = ({ filteredNotifications, handleApprove, handleReject, loading, rejectLoading }: any) => {
  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const statusConfig: any = {
    pending: {
      color: "text-[var(--warning-text)]",
      bg: "bg-[var(--warning-bg)]",
      border: "border-[var(--warning-banner-border)]",
      badge: "border-[var(--warning-banner-border)] bg-[var(--warning-bg)] text-[var(--warning-text)]",
    },
    accept: {
      color: "text-[var(--success-text)]",
      bg: "bg-[var(--success-bg)]",
      border: "border-[var(--success-bg)]",
      badge: "border-[var(--success-bg)] bg-[var(--success-bg)] text-[var(--success-text)]",
    },
    reject: {
      color: "text-[var(--danger-text)]",
      bg: "bg-[var(--danger-bg)]",
      border: "border-[var(--danger-bg)]",
      badge: "border-[var(--danger-bg)] bg-[var(--danger-bg)] text-[var(--danger-text)]",
    },
  };

  const statusIcons: any = {
    pending: <Clock className="h-4 w-4 text-[var(--warning-text)]" />,
    accept: <CheckCircle className="h-4 w-4 text-[var(--success-text)]" />,
    reject: <X className="h-4 w-4 text-[var(--danger-text)]" />,
  };

  return (
    <>
      {filteredNotifications?.map((notif: any) => {
        const status = notif?.status || "pending";
        const config = statusConfig[status];
        const Icon = statusIcons[status] || <Bell className="h-4 w-4 text-[var(--primary)]" />;
        const disableApprove = status === "accept";
        const disableReject = status === "reject";

        return (
          <div key={notif?.id} className={`group rounded-[16px] border bg-[var(--surface)] p-5 transition-colors duration-150 ease-out hover:bg-[var(--hover)] ${status === "pending" ? "border-[var(--warning-banner-border)]" : "border-[var(--border)]"}`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${config.bg}`}>
                    {Icon}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[var(--text)]">{notif?.title || "Request"}</h4>
                    <p className="text-sm text-[var(--text-muted)]">{notif?.message}</p>
                  </div>
                </div>

                <div className="flex flex-shrink-0 items-center gap-3">
                  <span className="whitespace-nowrap text-xs text-[var(--text-muted)]">{notif?.time}</span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${config.badge}`}>{status}</span>
                  {status === "pending" && <span className="h-2 w-2 rounded-full bg-[var(--accent)]" aria-hidden="true" />}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)] p-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    {notif?.profile_image ? (
                      <Image src={notif?.profile_image || "/avatar.png"} alt="Profile" width={56} height={56} className="h-14 w-14 rounded-full border-2 border-[var(--border)] object-cover" loading="lazy" />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[var(--border)] bg-[var(--primary-soft)] text-lg font-bold text-[var(--primary)]">
                        {getInitials(notif?.name)}
                      </div>
                    )}
                    <div className={`absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-[var(--surface)] p-0.5 ${config.bg}`}>
                      {Icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Name</p>
                    <p className="truncate text-sm font-medium text-[var(--text)]">{notif?.name || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[var(--primary-soft)] p-1.5">
                    <Mail className="h-3.5 w-3.5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Email</p>
                    <p className="truncate text-sm font-medium text-[var(--text)]">{notif?.email || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[var(--primary-soft)] p-1.5">
                    <Building2 className="h-3.5 w-3.5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Department</p>
                    <p className="truncate text-sm font-medium text-[var(--text)]">{notif?.department || "N/A"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[var(--primary-soft)] p-1.5">
                    <DollarSign className="h-3.5 w-3.5 text-[var(--primary)]" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--text-muted)]">Salary</p>
                    <p className="truncate text-sm font-medium text-[var(--text)]">${notif?.salary || "N/A"}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[var(--border)] pt-2">
                <button onClick={() => handleApprove(notif?.id)} disabled={loading || disableApprove} className="flex min-h-11 items-center gap-2 rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-medium text-[var(--on-primary)] transition-colors duration-150 ease-out hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50">
                  <CheckCircle className="h-4 w-4" />
                  {loading ? <Spinner className="h-4 w-4 text-[var(--success-text)]" /> : "Approve"}
                </button>

                <button onClick={() => handleReject(notif?.id)} disabled={rejectLoading || disableReject} className="flex min-h-11 items-center gap-2 rounded-full border border-[var(--danger-bg)] bg-[var(--danger-bg)] px-5 py-2 text-sm font-medium text-[var(--danger-text)] transition-colors duration-150 ease-out hover:border-[var(--danger-text)] disabled:cursor-not-allowed disabled:opacity-50">
                  <X className="h-4 w-4" />
                  {rejectLoading ? <Spinner className="h-4 w-4 text-[var(--danger-text)]" /> : "Reject"}
                </button>

                {status === "accept" && <span className="ml-auto flex items-center gap-1 text-xs text-[var(--success-text)]"><CheckCircle className="h-3.5 w-3.5" /> Already Approved</span>}
                {status === "reject" && <span className="ml-auto flex items-center gap-1 text-xs text-[var(--danger-text)]"><X className="h-3.5 w-3.5" /> Already Rejected</span>}
              </div>

              {notif?.employee_file && (
                <div className="mt-6 overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)]">
                  <div className="flex flex-col gap-4 border-b border-[var(--border)] p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--primary-soft)]">
                        <FileText className="h-5 w-5 text-[var(--primary)]" />
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-[var(--text)]">Employee Document</h3>
                        <p className="text-xs text-[var(--text-muted)]">Preview the uploaded document or download it.</p>
                      </div>
                    </div>

                    <Button onClick={() => handleDownload(notif?.employee_file)} className="flex items-center gap-2 bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)]">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>

                  <div className="p-4">
                    <iframe src={`${notif?.employee_file}#toolbar=0&navpanes=0&scrollbar=0`} title="Employee Document" className="document-preview-frame h-[200px] w-full max-w-[320px] rounded-lg border border-[var(--border)] bg-[var(--surface)]" scrolling="no" />
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default React.memo(CardContent);
