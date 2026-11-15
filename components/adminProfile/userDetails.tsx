import { formatDate } from "../common/formatDate";

const UserDetails = ({ userData }: any) => {
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

    </>
  );
};

export default UserDetails;
