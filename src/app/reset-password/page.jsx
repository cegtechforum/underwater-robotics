"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "react-hot-toast";
import BottomGradient from "@/components/BottomGradient";
import { Icon, Loader2 } from "lucide-react";
import { IconEye, IconEyeOff, IconKey } from "@tabler/icons-react";
import Cookies from "js-cookie";
import apiCall from "@/lib/apiCall";
import Footer from "@/components/Footer";

export function OTPVerificationForm() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const router = useRouter();

  const storedEmail = Cookies.get("email");
  const [email, setEmail] = useState(storedEmail || "");

  useEffect(() => {
    if (!storedEmail) {
      router.push("/login");
    }
  }, [storedEmail, router]);

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  const PasswordHintSection = () =>
    isPasswordFocused && (
      <div className="text-xs text-neutral-600 mt-2">
        <ul className="space-y-1">
          <li>
            Include a mix of uppercase and lowercase letters, numbers, and
            special characters
          </li>
          <li>Aim for at least 8 characters</li>
        </ul>
      </div>
    );

  const handleResendOTP = async () => {
    setIsResending(true);
    try {
      const response = await apiCall("/resend-otp", { email }, "POST");

      if (response.status === 200) {
        toast.success("New OTP sent to your email!");
        setOtpVerified(false);
        setOtp("");
        setResendTimer(30);
      } else {
        toast.error(response.message || "Failed to resend OTP!");
      }
    } catch (error) {
      toast.error("Error resending OTP!");
    } finally {
      setIsResending(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await apiCall("/verify-otp", { otp }, "POST");

      if (response.status === 200) {
        toast.success("OTP verified successfully");
        setOtpVerified(true);
      } else {
        toast.error(response.message || "Failed to verify OTP");
      }
    } catch (error) {
      toast.error("Error verifying OTP");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Please enter a new password");
      return;
    }

    if (!otpVerified) {
      toast.error("Please verify OTP first");
      return;
    }

    setIsResettingPassword(true);
    try {
      const response = await apiCall(
        "/reset-password",
        { email, otp, newPassword },
        "POST"
      );

      if (response.status === 200) {
        toast.success("Password reset successfully");
        router.push("/login");
        Cookies.remove("email");
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Error resetting password");
    } finally {
      setIsResettingPassword(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
          <div className="w-full md:w-1/2 bg-blue-50 py-8 flex items-center justify-center">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <IconKey
                  size={120}
                  stroke={1.5}
                  className="text-blue-600 bg-white rounded-full p-6 shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {!otpVerified ? "Verify OTP" : "Reset Password"}
              </h3>
              <p className="text-gray-600 px-8">
                {!otpVerified
                  ? "Enter OTP sent to your email"
                  : "Enter your new password"}
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
            <form
              onSubmit={!otpVerified ? handleVerifyOTP : handleResetPassword}
              className="space-y-4 md:space-y-6"
            >
              {!otpVerified && (
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-gray-700">
                    OTP <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full py-2 px-3 border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    required
                  />
                </div>
              )}

              {otpVerified && (
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-700">
                    New Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={isPasswordVisible ? "text" : "password"}
                      value={newPassword}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full py-2 px-3 border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                      onClick={() => setIsPasswordVisible((prev) => !prev)}
                    >
                      {isPasswordVisible ? (
                        <IconEyeOff size={18} />
                      ) : (
                        <IconEye size={18} />
                      )}
                    </div>
                  </div>
                  <PasswordHintSection />
                </div>
              )}

              <Button
                type="submit"
                className={cn(
                  "bg-gradient-to-br relative from-black to-neutral-600 block w-full text-white rounded-md h-12 font-medium shadow-md",
                  {
                    "opacity-50 cursor-not-allowed":
                      isVerifying || isResettingPassword,
                  }
                )}
                disabled={isVerifying || isResettingPassword}
              >
                {isVerifying || isResettingPassword ? (
                  <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
                ) : otpVerified ? (
                  "Reset Password"
                ) : (
                  "Verify OTP"
                )}
                <BottomGradient />
              </Button>

              {!otpVerified && (
                <div className="text-center text-gray-600 mt-4 text-xs md:text-sm">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={resendTimer > 0 || isResending}
                    className={cn(
                      "text-blue-600 ml-2 hover:underline",
                      {
                        "opacity-50 cursor-not-allowed": resendTimer > 0,
                      }
                    )}
                  >
                    {isResending
                      ? "Resending..."
                      : resendTimer > 0
                      ? `Resend OTP in ${resendTimer}s`
                      : "Resend OTP"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer variant="default" />
    </>
  );
}

export default OTPVerificationForm;
