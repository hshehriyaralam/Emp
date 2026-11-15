"use client"
import { LogOutIcon, ChevronRightIcon } from "lucide-react";
import { formatDate } from "../common/formatDate";
import { Button } from "../ui/button";

const UserDetails = ({ userData, logOut }: any) => {
  return (
    <>
      <div className="space-y-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 transition-colors duration-150 hover:border-[var(--accent)]">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">Full Name</p>
              <p className="truncate text-sm font-medium text-[var(--text)]">{userData?.name || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 transition-colors duration-150 hover:border-[var(--accent)]">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">Email Address</p>
              <p className="truncate text-sm font-medium text-[var(--text)]">{userData?.email || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 transition-colors duration-150 hover:border-[var(--accent)]">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">Joined Date</p>
              <p className="truncate text-sm font-medium text-[var(--text)]">{formatDate(userData?.created_at || userData?.joinDate)}</p>
            </div>
          </div>
        </div>

        {userData?.department && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4 transition-colors duration-150 hover:border-[var(--accent)]">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">Department</p>
                <p className="truncate text-sm font-medium text-[var(--text)]">{userData.department}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="my-6 border-t border-[var(--border)]" />

      <Button
        onClick={logOut}
        className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[var(--danger-bg)] font-semibold text-[var(--danger-text)] transition-colors "
      >
        <LogOutIcon className="h-4 w-4 transition-transform group-hover:rotate-12" />
        <span>Logout</span>
        <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </>
  );
};

export default UserDetails;
