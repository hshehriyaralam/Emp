"use client";
import { useMemo, useState } from "react";
import AppShell from "@/components/common/appShell";
import { useGetNotificationsQuery } from "@/store/notifications";
import {
  useAdminProfileQuery,
  useLogOutAdminMutation,
  useUpdateProfileImgMutation,
} from "@/store/admin";

import dynamic from "next/dynamic";
const NotificationsCards = dynamic(
  () => import("@/components/notifications/notfiycards"),
);

const Notifications = () => {
  const { data: Profile } = useAdminProfileQuery(undefined);
  const [logOutUser] = useLogOutAdminMutation();
  const [updateProfileImg] = useUpdateProfileImgMutation();
  const { data: notifications, isLoading } =
    useGetNotificationsQuery(undefined);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = useMemo(() => {
    if (!notifications) return [];
    if (filter === "all") return notifications;
    return notifications.filter((notif: any) => notif.status === filter);
  }, [notifications, filter]);

  const counts = useMemo(() => {
    if (!notifications) return { all: 0, pending: 0, accept: 0, reject: 0 };
    return {
      all: notifications.length,
      pending: notifications.filter((n: any) => n?.status === "pending").length,
      accept: notifications.filter((n: any) => n?.status === "accept").length,
      reject: notifications.filter((n: any) => n?.status === "reject").length,
    };
  }, [notifications]);

  return (
    <AppShell
      Profile={Profile}
      logOutUser={logOutUser}
      navigate="/admin-login"
      updateProfileImg={updateProfileImg}
      isAdmin
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="page-title">Requests</h1>
            <p className="page-subtitle">Review and manage employee requests</p>
          </div>
          <div className="request-filters" role="group" aria-label="Filter requests">
              <button
                type="button"
                aria-pressed={filter === "all"}
                onClick={() => setFilter("all")}
                className={`filter-pill${filter === "all" ? " active" : ""}`}
              >
                All ({counts.all})
              </button>
              <button
                type="button"
                aria-pressed={filter === "pending"}
                onClick={() => setFilter("pending")}
                className={`filter-pill${filter === "pending" ? " active" : ""}`}
              >
                Pending ({counts.pending})
              </button>
              <button
                type="button"
                aria-pressed={filter === "accept"}
                onClick={() => setFilter("accept")}
                className={`filter-pill${filter === "accept" ? " active" : ""}`}
              >
                Accepted ({counts.accept})
              </button>
              <button
                type="button"
                aria-pressed={filter === "reject"}
                onClick={() => setFilter("reject")}
                className={`filter-pill${filter === "reject" ? " active" : ""}`}
              >
                Rejected ({counts.reject})
              </button>
          </div>
        </div>

        <NotificationsCards
          isLoading={isLoading}
          filteredNotifications={filteredNotifications}
        />
      </div>
    </AppShell>
  );
};

export default Notifications;
