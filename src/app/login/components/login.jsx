"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { IconEye, IconEyeOff, IconSubmarine } from "@tabler/icons-react";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import BottomGradient from "@/components/BottomGradient";
import { Button } from "@/components/ui/button";
import { signIn, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Home, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function LoginForm() {
  const [role] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const session = await getSession();

      if (session?.user?.role === "admin") {
        toast.error("Already logged in as an admin. Logging out...", {
          icon: "⚠️",
          duration: 3000,
        });
        await signOut({ redirect: false });
      }

      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        role,
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Login successful!");
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error("An error occurred during login");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateHome = () => {
    router.push("/");
  };

  return (
    <>
      <Toaster />
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-xl overflow-hidden"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-full md:w-1/2 bg-blue-50 py-8 flex items-center justify-center"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <IconSubmarine
                  size={120}
                  stroke={1.5}
                  className="text-blue-600 bg-white rounded-full p-6 shadow-lg animate-pulse"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Underwater Innovation
              </h3>
              <p className="text-gray-600 px-8">
                Dive into innovation with underwater robotics
              </p>
              <Button
                onClick={navigateHome}
                variant="ghost"
                className="mt-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                aria-label="Go to home page"
              >
                <Home className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center"
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                Welcome, Innovator
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Access your underwater robotics dashboard
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Email Address <span className="text-red-500">*</span>{" "}
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full py-2 md:py-2.5 px-3 md:px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">
                  Password <span className="text-red-500">*</span>{" "}
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full py-2 md:py-2.5 px-3 md:px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 pr-12 text-sm md:text-base"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                  >
                    {showPassword ? (
                      <IconEyeOff size={20} />
                    ) : (
                      <IconEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Link
                  href="/password-reset"
                  className="text-xs md:text-sm text-blue-600 hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className={cn(
                  "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-12 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
                  { "opacity-50 cursor-not-allowed": isSubmitting }
                )}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
                <BottomGradient />
              </Button>

              <div className="text-center text-gray-600 mt-4 text-xs md:text-sm">
                Don&apos;t have an account?
                <Link
                  href="/signup"
                  className="text-blue-600 ml-2 hover:underline"
                >
                  Register
                </Link>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}