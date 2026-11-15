"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
// import { toast } from "sonner";
import { ArrowRight, Clock, CheckCircle, Loader2 } from "lucide-react";


const OTPVerification = ({
  email,
  handleResendOTP,
  handleVerifyOTP,
  otp,
  setOtp,
  isLoading
}: any) => {
  const [isResending, setIsResending] = useState(false);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  // Timer logic
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);


  return (
    <div className="flex min-h-dvh items-center justify-center bg-[var(--bg)] px-4 py-8 sm:px-6 lg:px-8 font-quicksand">
      <div className="relative z-10 w-full max-w-[420px]">
        <div className="rounded-[16px] border border-[var(--border)] bg-[var(--surface)] p-8">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[11px] bg-[var(--primary-soft)] text-[var(--primary)]">
              <CheckCircle className="h-5 w-5" />
            </div>
            <h2 className="text-[26px] font-[650] tracking-[-0.025em] text-[var(--text)]">
              OTP Verification
            </h2>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              Enter the 6-digit OTP sent to{" "}
              <span className="font-medium text-[var(--primary)]">{email}</span>
            </p>
          </div>
          <div className="flex justify-center mb-8">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup className="gap-2">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="h-14 w-12 rounded-[12px] border border-[var(--border)] bg-[var(--surface-2)] text-center text-xl font-semibold text-[var(--text)] outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="mb-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
            <Clock className="h-4 w-4 text-[var(--primary)]" />
              <span>
                {timer > 0 ? (
                  <>Resend in <span className="font-semibold text-[var(--primary)]">{timer}s</span></>
                ) : (
                  <span className="text-[var(--success-text)]">Ready to resend</span>
                )}
              </span>
            </div>
            <button
              onClick={handleResendOTP}
              disabled={!canResend || isResending}
              className={`min-h-11 rounded-full px-3 text-sm font-medium transition-colors duration-150 ${
                canResend && !isResending
                  ? "text-[var(--primary)] hover:underline"
                  : "cursor-not-allowed text-[var(--text-muted)] opacity-50"
              }`}
            >
              {isResending ? (
                <span className="flex items-center gap-1">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Sending...
                </span>
              ) : (
                "Resend OTP"
              )}
            </button>
          </div>
          <Button
            onClick={handleVerifyOTP}
            disabled={isLoading}
            className="flex h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--primary)] font-semibold text-[var(--on-primary)] hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Verify OTP
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
          <div className="text-center pt-4">
            <p className="text-sm text-[var(--text-muted)]">
              Didn't receive OTP?{" "}
              <button
                onClick={handleResendOTP}
                disabled={!canResend || isResending}
                className={`min-h-11 rounded-full px-2 font-medium transition-colors hover:underline ${
                  canResend && !isResending
                    ? "text-[var(--primary)]"
                    : "cursor-not-allowed text-[var(--text-muted)]"
                }`}
              >
                Click here to resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(OTPVerification);