"use client";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { X, User, Mail, Building2, DollarSign } from "lucide-react";
import { EmployeeForm } from "@/types/employee";
import { toast } from "sonner";
import React, { useEffect } from "react";
import { useUpdateEmployeeMutation } from "@/store/employeeApi";
import { useModalAccessibility } from "@/lib/useModalAccessibility";

const UpdateModal = ({ setIsEditModal, employee }: any) => {
  const [updateEmployee, { isLoading }] = useUpdateEmployeeMutation();
  const closeModal = () => setIsEditModal(false);
  const dialogRef = useModalAccessibility<HTMLDivElement>(closeModal);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeForm>();

  const onSubmit = async (data: EmployeeForm) => {
    try {
      await updateEmployee({
        id: employee.id,
        updatedData: data,
      }).unwrap();

      toast.success("Employee Successfully Updated!", {
        position: "top-center",
        duration: 3000,
      });
      reset();
      setIsEditModal(false);
    } catch (error: any) {
      toast.error(error.message || "Update failed", {
        position: "top-center",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        department: employee.department,
        salary: employee.salary,
      });
    }
  }, [employee, reset]);

  return (
    <div className="modal-backdrop">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="update-employee-title" tabIndex={-1} className="modal-panel w-full max-w-[640px] rounded-[16px] border border-[var(--border)] bg-[var(--surface)]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] p-6">
          <div>
            <h2 id="update-employee-title" className="text-[24px] font-[650] tracking-[-0.02em] text-[var(--text)]">Update Employee</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Edit employee information</p>
          </div>
          <button type="button" onClick={() => setIsEditModal(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="min-h-0 flex-1 space-y-5 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><User className="h-4 w-4 text-[var(--primary)]" />Full Name *</label>
              <input
                type="text"
                required
                data-initial-focus
                {...register("name", { required: "Name is required" })}
                className={`w-full rounded-[12px] border bg-[var(--surface-2)] px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${errors.name ? "border-[var(--danger-text)]" : "border-[var(--border)]"}`}
                placeholder="John Doe"
              />
              {errors.name && <p className="mt-1 text-xs text-[var(--danger-text)]">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><Mail className="h-4 w-4 text-[var(--primary)]" />Email Address *</label>
              <input
                type="email"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                    message: "Only Gmail addresses are allowed",
                  },
                })}
                className={`w-full rounded-[12px] border bg-[var(--surface-2)] px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${errors.email ? "border-[var(--danger-text)]" : "border-[var(--border)]"}`}
                placeholder="john@gmail.com"
              />
              {errors.email && <p className="mt-1 text-xs text-[var(--danger-text)]">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><Building2 className="h-4 w-4 text-[var(--primary)]" />Department *</label>
              <select
                required
                {...register("department", { required: "Department is required" })}
                className="w-full rounded-[12px] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[14px] text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2"
              >
                <option value="">Select Department</option>
                <option value="Engineering">Engineering</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
                <option value="Design">Design</option>
                <option value="Operations">Operations</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><DollarSign className="h-4 w-4 text-[var(--primary)]" />Salary (USD) *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  step="1000"
                  {...register("salary", { required: "Salary is required", valueAsNumber: true, min: { value: 0, message: "Salary must be positive" } })}
                  className={`w-full rounded-[12px] border bg-[var(--surface-2)] py-3 pl-9 pr-4 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${errors.salary ? "border-[var(--danger-text)]" : "border-[var(--border)]"}`}
                  placeholder="60000"
                />
              </div>
              {errors.salary && <p className="mt-1 text-xs text-[var(--danger-text)]">{errors.salary.message}</p>}
            </div>
          </div>

          <div className="modal-footer">
            <Button type="button" onClick={() => setIsEditModal(false)} className="h-11 flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-2)]">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="h-11 flex-1 rounded-full bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50">
              {isLoading ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-[var(--on-primary-muted)] border-t-[var(--on-primary)]"></span>
                  Updating...
                </>
              ) : (
                "Update Employee"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(UpdateModal);