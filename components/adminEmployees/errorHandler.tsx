import React from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";

const ErrorHandler = () => (
  <div className="mx-auto w-full max-w-3xl rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-8 text-center sm:p-12">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--warning-banner-bg)] text-[var(--warning-text)]">
      <Search className="h-7 w-7" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-semibold text-[var(--text)]">Employee Not Found</h3>
    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
      The employee you&apos;re looking for doesn&apos;t exist or has been removed.
    </p>
    <Link
      href="/admin-dashboard"
      className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-[var(--on-primary)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      Back to Employees
    </Link>
  </div>
);

export default React.memo(ErrorHandler);
