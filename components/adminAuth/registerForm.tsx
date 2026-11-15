"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { RegisterInputs } from "@/types/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import React, { useState } from "react";

const RegisterForm = ({
  loginLink,
  heading,
  handleSubmit,
  onSubmit,
  errors,
  register,
  isLoading
}: any) => {
  const [showPassword, setShowPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // const [steps , setSteps] = useState(1)

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   watch,
  //   formState: { errors },
  // } = useForm<RegisterInputs>();
  // const router = useRouter();
  // const onSubmit = async (data: RegisterInputs) => {
  //   const { name, email, password } = data;
  //   setIsLoading(true);
  //   try {
  //     const response = await registerUser({
  //       name,
  //       email,
  //       password,
  //     }).unwrap();
  //     toast.success("Account created successfully!", {
  //       position: "top-center",
  //     });
  //     router.push(navigation);
  //   } catch (error: any) {
  //     console.log(error);
  //     toast.error(error?.data?.message || "Registration failed", {
  //       position: "top-center",
  //     });
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-[420px]">
        <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-8">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[11px] bg-[var(--primary-soft)] text-[var(--primary)]">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 8a5 5 0 0 1 10 0" />
                <path d="M5 18a7 7 0 0 1 14 0" />
                <circle cx="12" cy="8" r="2.5" />
              </svg>
            </div>
            <h2 className="text-[30px] font-[650] tracking-[-0.025em] text-[var(--text)]">
              Create Account <span className="text-sm font-medium text-[var(--text-muted)]">{heading}</span>
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">Join us and start managing your team</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text)]">Full Name</label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name must be at least 2 characters" },
                  })}
                  className={`w-full rounded-[12px] border bg-[var(--surface)] px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors duration-150 focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${errors.name ? "border-[var(--danger-text)]" : "border-[var(--border)]"}`}
                  placeholder="John Doe"
                />
                {errors.name && <span className="mt-2 block text-xs text-[var(--danger-text)]">{errors.name.message}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text)]">Email Address</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Only Gmail addresses are allowed",
                    },
                  })}
                  className={`w-full rounded-[12px] border bg-[var(--surface)] px-4 py-3 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors duration-150 focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${errors.email ? "border-[var(--danger-text)]" : "border-[var(--border)]"}`}
                  placeholder="example@gmail.com"
                />
                {errors.email && <span className="mt-2 block text-xs text-[var(--danger-text)]">{errors.email.message}</span>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[var(--text)]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 8, message: "Password must be at least 8 characters" },
                    })}
                    className={`w-full rounded-[12px] border bg-[var(--surface)] px-4 py-3 pr-12 text-[14px] text-[var(--text)] placeholder:text-[var(--text-subtle)] outline-none transition-colors duration-150 focus:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 ${errors.password ? "border-[var(--danger-text)]" : "border-[var(--border)]"}`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <span className="mt-2 block text-xs text-[var(--danger-text)]">{errors.password.message}</span>}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-[var(--on-primary-muted)] border-t-[var(--on-primary)]"></span>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>

            <div className="pt-2 text-center">
              <p className="text-sm text-[var(--text-muted)]">
                Already have an account? {" "}
                <Link href={loginLink} className="font-medium text-[var(--primary)] underline-offset-2 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default  React.memo(RegisterForm) ;
