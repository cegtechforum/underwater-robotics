"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconMail } from "@tabler/icons-react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import BottomGradient from "@/components/BottomGradient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import Cookies from "js-cookie";
import apiCall from "@/lib/apiCall";
import Footer from "@/components/Footer";

export function PasswordResetForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiCall("/send-otp", { email }, "POST");

      if (response.status === 404) {
        toast.error("Email not found. Please try again.");
      } else if (response.status === 200) {
        toast.success("OTP sent to your email!");
        Cookies.set("email", email, { path: "/" });
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(
          response.message || "Failed to send OTP. Please try again."
        );
      }
    } catch (error) {
      console.error("Error in handleSendOTP:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
          <div className="w-full md:w-1/2 bg-blue-50 py-8 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <IconMail
                  size={120}
                  stroke={1.5}
                  className="text-blue-600 bg-white rounded-full p-6 shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Request OTP
              </h3>
              <p className="text-gray-600 px-8">
                Enter your email address to receive an OTP.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
            <form onSubmit={handleSendOTP} className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full py-2 px-3 border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  required
                />
              </div>

              <Button
                type="submit"
                className={cn(
                  "bg-gradient-to-br relative from-black to-neutral-600 block w-full text-white rounded-md h-12 font-medium shadow-md",
                  { "opacity-50 cursor-not-allowed": isSubmitting }
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
                    Sending...
                  </>
                ) : (
                  "Send OTP"
                )}
                <BottomGradient />
              </Button>

              <div className="text-center text-gray-600 mt-4 text-xs md:text-sm">
                Remembered your password?
                <Link
                  href="/login"
                  className="text-blue-600 ml-2 hover:underline"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer variant="default" />
    </>
  );
}

export default PasswordResetForm;
