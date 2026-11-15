"use client";
import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { useEmployeeProfileQuery, useLogOutEmployeeMutation, useUpdateEmployeeProfileImgMutation } from "@/store/employeeProfile";
import { Button } from "@/components/ui/button";
import { useAddEmployeeReqMutation, useEmployeeRequestQuery } from "@/store/employeeApi";
import dynamic from "next/dynamic";
import AppShell from "@/components/common/appShell";

const CreateEmployeeReq = dynamic(() => import("@/components/employeeDashboard/createEmployeeReq"));
const Loader = dynamic(() => import("@/components/common/loader"));
const RequestCard = dynamic(() => import("@/components/employeeDashboard/requestCard"));

const EmployeeDashboard = () => {
  const { data: Profile } = useEmployeeProfileQuery(undefined);
  const [logOutUser] = useLogOutEmployeeMutation();
  const [updateEmployeeProfileImg] = useUpdateEmployeeProfileImgMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addEmployeeReq, { isLoading: Adding }] = useAddEmployeeReqMutation();
  const { data: OwnRequest, isLoading: OwnRequestLoading } = useEmployeeRequestQuery(undefined);
  const employeeReq = OwnRequest?.data;

  if (OwnRequestLoading) {
    return (
      <AppShell Profile={Profile} logOutUser={logOutUser} navigate="/login" updateProfileImg={updateEmployeeProfileImg} isAdmin={false}>
        <div className="flex min-h-[70vh] items-center justify-center">
          <Loader />
        </div>
      </AppShell>
    );
  }

  if (!employeeReq) {
    return (
      <AppShell Profile={Profile} logOutUser={logOutUser} navigate="/login" updateProfileImg={updateEmployeeProfileImg} isAdmin={false}>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex min-h-[70vh] flex-col items-center justify-center">
            <div className="w-full max-w-2xl rounded-[28px] border border-[var(--border)] bg-[var(--surface)] p-5 text-center  sm:p-12">
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[var(--primary-soft)]">
                <FileText className="h-12 w-12 text-[var(--primary)]" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-[var(--text)] sm:text-3xl">No Request Found</h2>
              <p className="mx-auto mb-8 max-w-md text-[var(--text-muted)]">You haven&apos;t submitted any employee request yet. Create your first request to get started.</p>
              <Button onClick={() => setIsModalOpen(true)} className="w-full max-w-full cursor-pointer whitespace-normal rounded-xl bg-[var(--primary)] px-4 py-4 text-base font-semibold text-[var(--on-primary)] hover:bg-[var(--primary-hover)] sm:w-auto sm:px-8 sm:py-6 sm:text-lg">
                <Plus className="mr-2 h-5 w-5" />
                Create Employee Request
              </Button>
            </div>
          </div>
        </main>

        {isModalOpen && <CreateEmployeeReq setIsModalOpen={setIsModalOpen} addEmployeeReq={addEmployeeReq} isLoading={Adding} data={Profile} />}
      </AppShell>
    );
  }

  return (
    <AppShell Profile={Profile} logOutUser={logOutUser} navigate="/login" updateProfileImg={updateEmployeeProfileImg} isAdmin={false}>
      <RequestCard employeeReq={employeeReq} Profile={Profile} logOutUser={logOutUser} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
    </AppShell>
  );
};

export default EmployeeDashboard;