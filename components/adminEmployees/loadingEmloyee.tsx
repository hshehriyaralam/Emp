import React from "react";

const LoadingEmployee = () => (
  <div className="mx-auto w-full max-w-4xl" role="status" aria-label="Loading employee">
    <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
      <div className="flex items-center gap-5">
        <div className="h-20 w-20 shrink-0 rounded-full bg-[var(--skeleton-start)]" />
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-5 w-1/3 rounded bg-[var(--skeleton-start)]" />
          <div className="h-4 w-1/4 rounded bg-[var(--skeleton-end)]" />
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="h-20 rounded-[16px] bg-[var(--skeleton-end)]" />
        ))}
      </div>
    </div>
  </div>
);

export default React.memo(LoadingEmployee);
