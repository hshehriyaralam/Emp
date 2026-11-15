import React from "react";
import { AlertCircle } from "lucide-react";

const ErrorInterface = () => (
  <div className="flex min-h-[50vh] items-center justify-center p-4">
    <div className="w-full max-w-md rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--danger-bg)] text-[var(--danger-text)]">
        <AlertCircle className="h-7 w-7" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--text)]">Failed to Load Data</h3>
      <p className="mb-6 mt-2 text-sm leading-6 text-[var(--text-muted)]">
        We couldn&apos;t fetch your employee data. Please try again.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="min-h-11 rounded-full bg-[var(--danger-solid)] px-6 py-2 text-sm font-medium text-[var(--on-primary)] transition-colors hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--danger-text)]"
      >
        Retry
      </button>
    </div>
  </div>
);

export default ErrorInterface;
