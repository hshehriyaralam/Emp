import React from "react";

const Loader = () => {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-[var(--bg)]" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[var(--border)] border-t-[var(--accent)] motion-reduce:animate-none" aria-hidden="true">
      </div>
      <span className="text-sm font-medium text-[var(--text-muted)]">Loading...</span>
    </div>
  );
};

export default  React.memo(Loader);
