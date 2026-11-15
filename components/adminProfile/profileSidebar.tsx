"use client";
import { MailIcon, XIcon, CheckIcon, Camera } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { forwardRef, useState, useRef } from "react";
import { ProfileSidebarProps } from "@/types/employee";
import UserDetails from "./userDetails";

export const ProfileSidebar = forwardRef<HTMLDivElement, ProfileSidebarProps>(
  ({ isOpen, onClose, userData, initials, logOutUser, navigate, updateProfileImg }, ref) => {
    const router = useRouter();
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const logOut = async () => {
      try {
        await logOutUser().unwrap();
        router.replace(navigate);
        router.refresh();
        toast.success("Successfully Logout", { position: "top-center" });
      } catch (error) {
        console.log(error);
        toast.error("Logout failed", { position: "top-center" });
      }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    };

    const handleSaveImage = async () => {
      if (!selectedFile) {
        toast.error("Please select an image first", { position: "top-center" });
        return;
      }

      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("profile_image", selectedFile);
        await updateProfileImg(formData).unwrap();
        toast.success("Profile image updated successfully!", { position: "top-center" });
        setImagePreview(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        router.refresh();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to update profile image");
      } finally {
        setIsLoading(false);
      }
    };

    const handleCancelImage = () => {
      setImagePreview(null);
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
      <>
        {isOpen && (
          <button
            type="button"
            className="profile-drawer-overlay"
            onClick={onClose}
            aria-label="Close profile"
          />
        )}

        <div
          ref={ref}
          role="dialog"
          aria-modal={isOpen ? "true" : undefined}
          aria-label="Profile"
          aria-hidden={!isOpen}
          inert={!isOpen}
          tabIndex={-1}
          className={`profile-drawer fixed right-0 top-0 h-full w-full sm:w-[400px] transition-transform duration-150 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
          style={{ display: "flex", flexDirection: "column", height: "100dvh", maxHeight: "100dvh" }}
        >
          <div className="flex flex-shrink-0 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] p-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-[var(--text)]">Profile</h2>
            </div>
            <Button variant="ghost" size="icon" className="flex-shrink-0 cursor-pointer rounded-full hover:bg-[var(--surface-2)]" onClick={onClose} aria-label="Close profile">
              <XIcon className="h-5 w-5 text-[var(--text-muted)]" />
            </Button>
          </div>

          <div className="profile-drawer-scroll flex-1 overflow-y-auto p-6 pb-8">
            <div className="mb-8 flex flex-col items-center text-center">
              <div className="relative flex flex-col items-center">
                <div className="relative">
                  <button
                    type="button"
                    className="profile-avatar-trigger"
                    aria-label="Change profile picture"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Avatar className="h-24 w-24 border-[3px] border-[var(--primary-soft-2)] bg-[var(--primary-soft)]">
                      <AvatarImage src={imagePreview || userData?.profile_image || undefined} alt="" loading="lazy" />
                      <AvatarFallback className="bg-[var(--primary-soft)] text-2xl font-bold text-[var(--primary)]">{initials}</AvatarFallback>
                    </Avatar>
                    <span className="profile-avatar-camera" aria-hidden="true">
                      <Camera className="h-4 w-4" />
                    </span>
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                </div>

                <h3 className="mt-4 text-xl font-semibold text-[var(--text)]">{userData?.name || "User Name"}</h3>

                <p className="mt-1 flex items-center gap-1 text-sm text-[var(--text-muted)]">
                  <MailIcon className="h-3.5 w-3.5" />
                  {userData?.email}
                </p>

                {imagePreview && (
                  <div className="relative z-50 mt-5 flex w-full max-w-xs gap-3">
                    <Button type="button" onClick={handleCancelImage} className="h-10 flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--surface-2)]">
                      Cancel
                    </Button>

                    <Button type="button" onClick={handleSaveImage} disabled={isLoading} className="h-10 flex-1 rounded-lg bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)]">
                      {isLoading ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--on-primary-muted)] border-t-[var(--on-primary)]" />
                      ) : (
                        <>
                          <CheckIcon className="mr-1 h-4 w-4" />
                          Save
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <UserDetails userData={userData} logOut={logOut} />
          </div>
        </div>
      </>
    );
  },
);

ProfileSidebar.displayName = "ProfileSidebar";
