"use client";

import React, { useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "react-hot-toast";
import { IconEye, IconEyeOff, IconKeyOff } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import apiCall from "@/lib/apiCall";

const ChangePasswordForm = () => {
  const [email, setEmail] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const session = await getSession();
      if (session?.user?.email) {
        setEmail(session.user.email);
      } else {
        toast.error("Unable to fetch user email. Please try again.");
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiCall(
        "/change-password",
        {
          email,
          currentPassword,
          newPassword,
        },
        "POST"
      );

      if (response.status === 200) {
        toast.success("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error("Failed to change password.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const PasswordHintSection = () =>
    isPasswordFocused && (
      <div className="text-xs text-neutral-600 mt-2">
        <ul className="space-y-1">
          <li>
            Include a mix of uppercase and lowercase letters, numbers, and
            special characters.
          </li>
          <li>Aim for at least 8 characters.</li>
        </ul>
      </div>
    );

  return (
    <>
      <Toaster />
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden">
          {/* Left Section with Icon and Description */}
          <div className="w-full md:w-1/2 bg-blue-50 py-8 flex items-center justify-center">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <IconKeyOff
                  size={120}
                  stroke={1.5}
                  className="text-blue-600 bg-white rounded-full p-6 shadow-lg"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Change Password
              </h3>
              <p className="text-gray-600 px-8">
                Secure your account with a new, strong password
              </p>
            </div>
          </div>

          {/* Right Section with Form */}
          <div className="w-full md:w-1/2 bg-white p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <h1 className="text-xl font-semibold text-center text-gray-800 mb-4">
                Update Your Password
              </h1>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password" className="text-gray-700">
                    Current Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                      {showCurrentPassword ? (
                        <IconEyeOff size={20} />
                      ) : (
                        <IconEye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-gray-700">
                    New Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                    >
                      {showNewPassword ? (
                        <IconEyeOff size={20} />
                      ) : (
                        <IconEye size={20} />
                      )}
                    </button>
                  </div>
                  <PasswordHintSection />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirm-new-password"
                    className="text-gray-700"
                  >
                    Confirm New Password <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 text-white rounded-md h-12 font-medium shadow-md hover:bg-blue-700 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
                    Updating Password...
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePasswordForm;
