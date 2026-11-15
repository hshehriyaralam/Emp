import React, { useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { X, User, Mail, Building2, DollarSign, Upload, User2Icon, Pencil, FileText } from "lucide-react";
import { EmployeeForm } from "@/types/employee";
import { toast } from "sonner";
import { useModalAccessibility } from "@/lib/useModalAccessibility";

const CreateEmployeeReq = ({ setIsModalOpen, onSuccess, addEmployeeReq, isLoading, data }: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [file, setFile] = useState<null | File>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const Id = data?.data?.id;
  const userEmail = data?.data?.email;
  const closeModal = () => setIsModalOpen(false);
  const dialogRef = useModalAccessibility<HTMLDivElement>(closeModal);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EmployeeForm>();

  const handleImageFile = (file?: File, files?: FileList | null) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) return toast.error("Please upload an image file");
    if (file.size > 2 * 1024 * 1024) return toast.error("Image size should be less than 2MB");

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
    setValue("employee_image", files || null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleImageFile(e.target.files?.[0], e.target.files);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    handleImageFile(e.dataTransfer.files[0], e.dataTransfer.files);
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue("employee_image", null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  const handleFile = (selectedFile?: File) => {
    if (!selectedFile) return;
    const allowedExtensions = [".pdf", ".doc", ".docx", ".xls", ".xlsx"];
    if (!allowedExtensions.some((extension) => selectedFile.name.toLowerCase().endsWith(extension))) {
      toast.error("Please upload a PDF, DOC, DOCX, XLS, or XLSX file");
      return;
    }
    setFile(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0]);
  };

  const handleFileDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    handleFile(e.dataTransfer.files[0]);
  };

  const removeFile = () => {
    setFile(null);
    setValue("employee_file", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (data: EmployeeForm) => {
    try {
      if (userEmail !== data.email) {
        toast.error("User email & Employee email does not match", { position: "top-center" });
        return;
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("department", data.department);
      formData.append("salary", data.salary.toString());
      if (!imageFile) {
        toast.error("Employee Image is Required", { position: "top-center" });
        return;
      }
      formData.append("employee_image", imageFile);
      formData.append("created_by_id", Id);
      if (file) {
        formData.append("file", file);
      }
      await addEmployeeReq(formData).unwrap();
      reset();
      removeImage();
      setIsModalOpen(false);
      onSuccess?.();
      toast.success("Employee Request Successfully Created!", { position: "top-center" });
    } catch (error: any) {
      toast.error(error?.data?.message || "Employee Request Failed!", { position: "top-center" });
    }
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    void handleSubmit(onSubmit)(event);
  };

  const employeeImage = register("employee_image");
  const employeeFile = register("employee_file");

  return (
    <div className="modal-backdrop">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="create-request-title" tabIndex={-1} className="modal-panel w-full max-w-[640px] rounded-[16px] border border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center justify-between border-b border-[var(--border)] p-5">
          <div>
            <h2 id="create-request-title" className="text-[24px] font-[650] tracking-[-0.02em] text-[var(--text)]">Create Employee Request</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Fill in the details for employee request</p>
          </div>
          <button type="button" onClick={() => setIsModalOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] hover:bg-[var(--surface-2)]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={submitForm} className="min-h-0 flex-1 space-y-4 overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><User className="h-4 w-4 text-[var(--primary)]" />Full Name *</label>
              <input type="text" data-initial-focus {...register("name", { required: "Name is required" })} className={`w-full rounded-[12px] border bg-[var(--surface-2)] px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${errors.name ? "border-[var(--danger-text)]" : "border-[var(--border)]"}`} placeholder="John Doe" />
              {errors.name && <p className="mt-1 text-xs text-[var(--danger-text)]">{errors.name.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><Mail className="h-4 w-4 text-[var(--primary)]" />Email Address *</label>
              <input type="email" {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/, message: "Only Gmail addresses are allowed" } })} className={`w-full rounded-[12px] border bg-[var(--surface-2)] px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${errors.email ? "border-[var(--danger-text)]" : "border-[var(--border)]"}`} placeholder="john@gmail.com" />
              {errors.email && <p className="mt-1 text-xs text-[var(--danger-text)]">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><Building2 className="h-4 w-4 text-[var(--primary)]" />Department *</label>
              <select {...register("department", { required: "Department is required" })} className="w-full rounded-[12px] border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-[14px] text-[var(--text)] outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2">
                <option value="">Select Department</option>
                {["Engineering", "Marketing", "Sales", "HR", "Finance", "Design", "Operations"].map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><DollarSign className="h-4 w-4 text-[var(--primary)]" />Salary (USD) *</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">$</span>
                <input type="number" min="0" step="1000" {...register("salary", { required: "Salary is required", valueAsNumber: true, min: { value: 0, message: "Salary must be positive" } })} className={`w-full rounded-[12px] border bg-[var(--surface-2)] py-3 pl-9 pr-4 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${errors.salary ? "border-[var(--danger-text)]" : "border-[var(--border)]"}`} placeholder="60000" />
              </div>
              {errors.salary && <p className="mt-1 text-xs text-[var(--danger-text)]">{errors.salary.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><User2Icon className="h-4 w-4 text-[var(--primary)]" />Employee Image *</label>

              {imagePreview ? (
                <div className="group relative" onDragOver={(event) => event.preventDefault()} onDrop={handleImageDrop}>
                  <div className="relative h-28 w-full overflow-hidden rounded-[16px] border border-[var(--border)] bg-[var(--surface-2)]">
                    <Image src={imagePreview} alt="Uploaded employee photo" fill sizes="(max-width: 640px) 100vw, 600px" unoptimized className="object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[var(--overlay)] opacity-0 transition-opacity duration-150 ease-out group-hover:opacity-100">
                      <label className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[10px] bg-[var(--primary)] text-[var(--on-primary)]">
                        <Pencil className="h-4 w-4" />
                        <input type="file" accept="image/*" className="hidden" {...employeeImage} ref={(element) => { employeeImage.ref(element); imageInputRef.current = element; }} onChange={(e) => { employeeImage.onChange(e); handleImageChange(e); }} />
                      </label>
                      <button type="button" onClick={removeImage} className="flex h-10 w-10 items-center justify-center rounded-[10px] bg-[var(--danger-text)] text-[var(--on-primary)]">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <label onDragOver={(event) => event.preventDefault()} onDrop={handleImageDrop} className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed border-[var(--border)] bg-[var(--surface-2)] transition-colors hover:border-[var(--accent)]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)]">
                    <Upload className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-sm font-medium text-[var(--text)]">Click to upload or drag and drop</p>
                  <input type="file" accept="image/*" className="hidden" {...employeeImage} ref={(element) => { employeeImage.ref(element); imageInputRef.current = element; }} onChange={(e) => { employeeImage.onChange(e); handleImageChange(e); }} />
                </label>
              )}
              {errors.employee_image && <p className="mt-1 text-xs text-[var(--danger-text)]">Employee Image is Required</p>}
            </div>

            <div className="space-y-1.5">
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text)]"><User2Icon className="h-4 w-4 text-[var(--primary)]" />Employee Resume *</label>

              <label onDragOver={(event) => event.preventDefault()} onDrop={handleFileDrop} className="flex h-28 w-full cursor-pointer flex-col items-center justify-center rounded-[16px] border border-dashed border-[var(--border)] bg-[var(--surface-2)] transition-colors hover:border-[var(--accent)]">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--primary)]">
                  {file ? <FileText className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
                </div>
                <p className="mt-2 max-w-[90%] truncate text-sm font-medium text-[var(--text)]">
                  {file?.name || "Click to upload or drag and drop"}
                </p>

                <input {...employeeFile} ref={(element) => { employeeFile.ref(element); fileInputRef.current = element; }} onChange={(e) => { employeeFile.onChange(e); handleFileChange(e); }} type="file" accept=".pdf, .doc, .docx, .xls, .xlsx" className="hidden" />
              </label>
              {file && <button type="button" onClick={removeFile} className="mt-1 min-h-11 text-xs font-medium text-[var(--danger-text)] underline-offset-2 hover:underline">Remove file</button>}
              {errors.employee_file && <p className="mt-1 text-xs text-[var(--danger-text)]">Employee Resume is Required</p>}
            </div>
          </div>

          <div className="modal-footer">
            <Button type="button" onClick={() => { setIsModalOpen(false); removeImage(); }} className="h-12 flex-1 rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-2)]">Cancel</Button>
            <Button type="submit" disabled={isLoading} className="h-12 flex-1 rounded-full bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] disabled:opacity-60">
              {isLoading ? (
                <>
                  <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-[var(--on-primary-muted)] border-t-[var(--on-primary)]"></span>
                  Adding...
                </>
              ) : (
                "Create Request"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(CreateEmployeeReq);
