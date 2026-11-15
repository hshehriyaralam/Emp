"use client";
import { Trash2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useDeleteEmployeeMutation } from "@/store/employeeApi";
import { Spinner } from "../ui/spinner";
import { useRouter } from "next/navigation";
import { useModalAccessibility } from "@/lib/useModalAccessibility";

const DeleteModal = ({ setIsDeleteModalOpen, employee, setIsDeleting, isDeleting }: any) => {
  const [deleteEmployee, { isLoading: deletingLoading }] = useDeleteEmployeeMutation();
  const router = useRouter();
  const closeModal = () => setIsDeleteModalOpen(false);
  const dialogRef = useModalAccessibility<HTMLDivElement>(
    closeModal,
    !deletingLoading && !isDeleting,
  );

  const handleDelete = async (id: number) => {
    try {
      setIsDeleting(true);
      const response = await deleteEmployee(id).unwrap();
      if (response.error) {
        console.log("Delete Employee Failed", response?.error);
        setIsDeleting(false);
        return;
      }
      toast.success("Employee Deleted Successfully", { position: "top-center" });
      router.replace("/admin-dashboard");
    } catch (error) {
      setIsDeleting(false);
      toast.error("Delete Employee Failed", { position: "top-center" });
    }
  };

  return (
    <div className="modal-backdrop">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="delete-employee-title" tabIndex={-1} className="modal-panel w-full max-w-[420px] rounded-[16px] border border-[var(--border)] bg-[var(--surface)]">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[var(--danger-bg)]">
            <Trash2 className="h-6 w-6 text-[var(--danger-text)]" />
          </div>

          <h3 id="delete-employee-title" className="mb-2 text-xl font-bold text-[var(--text)]">Delete Employee?</h3>
          <p className="mb-6 text-sm text-[var(--text-muted)]">
            Are you sure you want to delete <strong className="font-semibold text-[var(--text)]">{employee?.name}</strong>?
          </p>

          <div className="modal-footer">
            <Button data-initial-focus onClick={() => setIsDeleteModalOpen(false)} disabled={deletingLoading || isDeleting} className="h-11 flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-2)] disabled:cursor-not-allowed">Cancel</Button>
            <Button onClick={() => handleDelete(employee?.id)} disabled={deletingLoading || isDeleting} className="h-11 flex-1 rounded-full bg-[var(--danger-solid)] text-[var(--on-primary)] hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
              {deletingLoading || isDeleting ? (
                <>
                  <Spinner className="h-4 w-4 text-[var(--on-primary)]" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DeleteModal);