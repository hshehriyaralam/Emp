"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bell, BriefcaseBusiness, Menu, UserRound, X } from "lucide-react";
import { useGetNotificationsQuery } from "@/store/notifications";
import { ProfileSidebar } from "../adminProfile/profileSidebar";

type AppShellProps = {
  children: React.ReactNode;
  Profile: any;
  logOutUser: any;
  navigate: string;
  updateProfileImg: any;
  isAdmin: boolean;
};

const BrandMark = () => (
  <span className="logo-tile" aria-hidden="true">
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 8a5 5 0 0 1 10 0" />
      <path d="M5 18a7 7 0 0 1 14 0" />
      <circle cx="12" cy="8" r="2.5" />
    </svg>
  </span>
);

const AppShell = ({
  children,
  Profile,
  logOutUser,
  navigate,
  updateProfileImg,
  isAdmin,
}: AppShellProps) => {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const profileDrawerRef = useRef<HTMLDivElement>(null);
  const { data: notifications } = useGetNotificationsQuery(undefined);
  const pendingRequests =
    notifications?.filter((notification: any) => notification?.status === "pending").length ?? 0;
  const user = Profile?.data;
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part: string) => part[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1024px)");
    const updateViewport = () => setIsMobileViewport(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (!isMobileNavOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = navRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileNavOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !navRef.current) return;
      const focusable = Array.from(
        navRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [isMobileNavOpen]);

  useEffect(() => {
    if (!isProfileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const returnFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    profileDrawerRef.current
      ?.querySelector<HTMLElement>('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      ?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsProfileOpen(false);
        returnFocus?.focus();
        return;
      }

      if (event.key !== "Tab" || !profileDrawerRef.current) return;
      const focusable = Array.from(
        profileDrawerRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      returnFocus?.focus();
    };
  }, [isProfileOpen]);

  const closeMobileNav = () => setIsMobileNavOpen(false);

  return (
    <div className="app-shell">
      <header className="mobile-topbar">
        <button
          ref={menuButtonRef}
          type="button"
          className="mobile-menu-button"
          aria-label={isMobileNavOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isMobileNavOpen}
          onClick={() => setIsMobileNavOpen((open) => !open)}
        >
          {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Link href={isAdmin ? "/admin-dashboard" : "/employee-dashboard"} className="shell-brand">
          <BrandMark />
          <span className="logo-row">
            <span className="logo-title">Employee Hub</span>
            <span className="logo-subtitle">Management System</span>
          </span>
        </Link>
        <span className="mobile-topbar-spacer" aria-hidden="true" />
      </header>

      {isMobileNavOpen && (
        <button
          type="button"
          className="mobile-nav-overlay"
          aria-label="Close navigation"
          onClick={closeMobileNav}
        />
      )}

      <aside
        ref={navRef}
        className={`app-sidebar${isMobileNavOpen ? " app-sidebar-open" : ""}`}
        aria-label={`${isAdmin ? "Admin" : "Employee"} navigation`}
        aria-hidden={isMobileViewport && !isMobileNavOpen}
        inert={isMobileViewport && !isMobileNavOpen}
      >
        <Link href={isAdmin ? "/admin-dashboard" : "/employee-dashboard"} className="sidebar-logo" onClick={closeMobileNav}>
          <BrandMark />
          <div className="logo-row">
            <div className="logo-title">Employee Hub</div>
            <div className="logo-subtitle">Management System</div>
          </div>
        </Link>

        <nav className="admin-nav" aria-label="Main navigation">
          {isAdmin ? (
            <>
              <Link href="/admin-dashboard" className={`nav-item${pathname === "/admin-dashboard" ? " active" : ""}`} onClick={closeMobileNav}>
                <UserRound size={18} />
                <span>Employees</span>
              </Link>
              <Link href="/admin-notification" className={`nav-item${pathname === "/admin-notification" ? " active" : ""}`} onClick={closeMobileNav}>
                <Bell size={18} />
                <span>Requests</span>
                {pendingRequests > 0 && <span className="nav-badge">{pendingRequests}</span>}
              </Link>
            </>
          ) : (
            <Link href="/employee-dashboard" className={`nav-item${pathname === "/employee-dashboard" ? " active" : ""}`} onClick={closeMobileNav}>
              <UserRound size={18} />
              <span>My Dashboard</span>
            </Link>
          )}
          <button
            type="button"
            className={`nav-item${isProfileOpen ? " active" : ""}`}
            onClick={() => {
              closeMobileNav();
              setIsProfileOpen(true);
            }}
          >
            <BriefcaseBusiness size={18} />
            <span>Profile</span>
          </button>
        </nav>
      </aside>

      <main className="app-main">{children}</main>
      <ProfileSidebar
        ref={profileDrawerRef}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        userData={user}
        initials={initials}
        logOutUser={logOutUser}
        navigate={navigate}
        updateProfileImg={updateProfileImg}
      />
    </div>
  );
};

export default AppShell;
