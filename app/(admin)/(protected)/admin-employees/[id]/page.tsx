"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetAllEmployeesQuery } from "@/store/employeeApi";
import { useRouter } from "next/navigation";
import { useAdminProfileQuery, useLogOutAdminMutation, useUpdateProfileImgMutation } from "@/store/admin";
import dynamic from "next/dynamic";
import AppShell from "@/components/common/appShell";
const EmployeeCard = dynamic(() => import("@/components/adminEmployees/employeCard"));
const DeleteModal = dynamic(() => import("@/components/adminDashboard/delelteModal"));
const UpdateModal = dynamic(() => import("@/components/adminDashboard/updateModal"));
const LoadingEmployee = dynamic(() => import("@/components/adminEmployees/loadingEmloyee"));
const ErrorHandler = dynamic(() => import("@/components/adminEmployees/errorHandler"));


const EmployeeDetails = () => {
  const { data: Profile } = useAdminProfileQuery(undefined);
  const [updateProfileImg] = useUpdateProfileImgMutation()
  const [logOutUser] = useLogOutAdminMutation();
  const [editModal, setIsEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const redirected = useRef(false);

  const {
    data: employees,
    isLoading,
    error,
  } = useGetAllEmployeesQuery(undefined);
  const employee = employees?.find((emp: any) => emp.id === Number(id));

  

  useEffect(() => {
  if (!isLoading && !error && employees && !employee && !redirected.current) {
    redirected.current = true;
    router.replace("/admin-dashboard");
  }
}, [employee, employees, error, isLoading, router]);
  if (isLoading || isDeleting) {
    return (
      <AppShell Profile={Profile} logOutUser={logOutUser} navigate="/admin-login" updateProfileImg={updateProfileImg} isAdmin>
        <LoadingEmployee />
      </AppShell>
    );
  }
  if (error) {
    return (
      <AppShell Profile={Profile} logOutUser={logOutUser} navigate="/admin-login" updateProfileImg={updateProfileImg} isAdmin>
        <ErrorHandler />
      </AppShell>
    );
  }
  if (!employee) return null;
  return (
    <AppShell Profile={Profile} logOutUser={logOutUser} navigate="/admin-login" updateProfileImg={updateProfileImg} isAdmin>
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin-dashboard"
          className="mb-4 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--text-muted)] hover:text-[var(--primary)]"
        >
          <span aria-hidden="true">‹</span>
          <span>Employees</span>
        </Link>
        <EmployeeCard
          employee={employee}
          setSelectedEmployee={setSelectedEmployee}
          setIsEditModal={setIsEditModal}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
        />
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          setIsDeleting={setIsDeleting}
          isDeleting={isDeleting}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          employee={employee}
        />
      )}
      {editModal && (
        <UpdateModal
          setIsEditModal={setIsEditModal}
          employee={selectedEmployee}
        />
      )}
    </AppShell>
  );
};

export default EmployeeDetails;
