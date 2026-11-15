import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] items-center justify-center bg-[var(--bg)] px-4 py-12">
      <div className="w-full max-w-md rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-8 text-center sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">404 error</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[var(--text)]">Page not found</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
          The page you&apos;re looking for doesn&apos;t exist or may have moved.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-medium text-[var(--on-primary)] transition-colors hover:bg-[var(--primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </main>
  );
}
