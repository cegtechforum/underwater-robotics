"use client";
import React, { useState, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import apiCall from "@/lib/apiCall";
import { Minus, Loader2, Home } from "lucide-react";
import BottomGradient from "@/components/BottomGradient";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export function TeamSignupForm() {
  const router = useRouter();

  const [teamMembers, setTeamMembers] = useState([
    { name: "", rollNo: "", phone: "", email: "" },
    { name: "", rollNo: "", phone: "", email: "" },
  ]);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const dropdownRef = useRef(null);

  const options = [
    { value: "projectProposal", label: "Project Proposal" },
    { value: "simulation", label: "Simulation Using Software" },
    { value: "hardwareDemo", label: "Hardware Demo" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option.value);
    setIsOpen(false);
  };

  const handleAddMember = () => {
    if (teamMembers.length < 4) {
      setTeamMembers([
        ...teamMembers,
        { name: "", rollNo: "", phone: "", email: "" },
      ]);
      toast.success("Team member added successfully!");
    } else {
      toast.error("You can only add up to 4 team members.");
    }
  };

  const handleRemoveMember = (indexToRemove) => {
    if (indexToRemove >= 2) {
      setTeamMembers(teamMembers.filter((_, index) => index !== indexToRemove));
      toast.success("Team member removed successfully!");
    } else {
      toast.error("Cannot remove default team members.");
    }
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...teamMembers];
    updatedMembers[index][field] = value;
    setTeamMembers(updatedMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const projectTypeMap = {
      projectProposal: "PROJECT_PROPOSAL",
      simulation: "SIMULATION",
      hardwareDemo: "HARDWARE_DEMO",
    };
    console.log("Selected option:", selectedOption);
    console.log("Project type:", projectTypeMap[selectedOption]);

    try {
      const formData = {
        teamName: document.getElementById("teamName").value.trim(),
        collegeName: document.getElementById("collegeName").value.trim(),
        district: document.getElementById("district").value.trim(),
        email: document.getElementById("email").value.trim(),
        password: document.getElementById("password").value,
        mentorName: document.getElementById("mentorName").value.trim(),
        mentorEmail: document.getElementById("mentorEmail").value.trim(),
        mentorPhone: document.getElementById("mentorPhone").value.trim(),
        projectType: projectTypeMap[selectedOption],
        teamMembers,
      };

      const response = await apiCall("/signup", formData, "POST");

      if (response.status >= 400) {
        if (response.errors && Array.isArray(response.errors)) {
          let errorIndex = 0;

          const handleNextError = () => {
            if (errorIndex < response.errors.length) {
              const error = response.errors[errorIndex];
              toast.error(`${error.message}`);
              const inputElement = document.getElementById(error.field);
              if (inputElement) {
                inputElement.focus();
                inputElement.addEventListener("input", () => {
                  errorIndex++;
                  handleNextError();
                });
              }
            }
          };
          handleNextError();
          return;
        } else {
          toast.error(response.message || "Registration failed");
        }
        return;
      }

      toast.success("Team registered successfully!");
      e.target.reset();
      setTeamMembers([
        { name: "", rollNo: "", phone: "", email: "" },
        { name: "", rollNo: "", phone: "", email: "" },
      ]);

      router.push("/login");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigateHome = () => {
    router.push("/");
  };

  const PasswordHintSection = () =>
    isPasswordFocused && (
      <div className="text-xs text-neutral-600 mt-2">
        <ul className="space-y-1">
          <li>
            Include a mix of uppercase and lowercase letters, numbers and
            special characters
          </li>
          <li>Aim for at least 8 characters</li>
        </ul>
      </div>
    );

  const pageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.3,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <Toaster />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        className="max-w-3xl w-full mx-auto rounded-3xl m-4"
      >
        <motion.div
          variants={childVariants}
          className="p-8 bg-white dark:bg-neutral-900 shadow-2xl rounded-3xl border border-neutral-200 dark:border-neutral-800"
        >
          <motion.div
            variants={childVariants}
            className="flex justify-between items-center mb-10"
          >
            <div className="text-center w-full">
              <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
                Team Registration
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-base">
              Join the Underwater Robotics Challenge
              </p>
            </div>
            <Button
              onClick={navigateHome}
              variant="ghost"
              className="ml-auto p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              aria-label="Go to home page"
            >
              <Home className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
            </Button>
          </motion.div>

          <motion.form
            variants={childVariants}
            className="space-y-8"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <LabelInputContainer>
                <Label htmlFor="teamName">
                  Team Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="teamName"
                  placeholder="Enter your team name"
                  type="text"
                  className="dark:bg-neutral-800"
                  required
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="collegeName">
                  College Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="collegeName"
                  placeholder="Enter your college name"
                  type="text"
                  className="dark:bg-neutral-800"
                  required
                />
              </LabelInputContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <LabelInputContainer>
                <Label htmlFor="district">
                  District <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="district"
                  placeholder="Enter your district"
                  type="text"
                  className="dark:bg-neutral-800"
                  required
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="email">
                  Email ID to Login <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  placeholder="example@domain.com"
                  type="email"
                  className="dark:bg-neutral-800"
                  required
                />
              </LabelInputContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <LabelInputContainer>
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    className="dark:bg-neutral-800 pr-10"
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
                  >
                    {showPassword ? (
                      <IconEyeOff className="h-5 w-5" />
                    ) : (
                      <IconEye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <PasswordHintSection />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="mentorName">Mentor Name</Label>
                <Input
                  id="mentorName"
                  placeholder="College staff member"
                  type="text"
                  className="dark:bg-neutral-800"
                />
              </LabelInputContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <LabelInputContainer>
                <Label htmlFor="mentorEmail">Mentor Email ID</Label>
                <Input
                  id="mentorEmail"
                  placeholder="mentor@college.edu"
                  type="email"
                  className="dark:bg-neutral-800"
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="mentorPhone">Mentor Phone Number</Label>

                <Input
                  id="mentorPhone"
                  placeholder="(+91) Add country code if other than India"
                  type="tel"
                  className="dark:bg-neutral-800"
                />
              </LabelInputContainer>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                  Team Members
                </h3>
                {teamMembers.length < 4 && (
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                    onClick={handleAddMember}
                  >
                    + Add Member
                  </button>
                )}
              </div>

              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="p-6 border rounded-lg bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 relative"
                >
                  {index >= 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(index)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                  )}
                  <h4 className="font-medium mb-4 text-neutral-700 dark:text-neutral-300 text-lg">
                    Member {index + 1}
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <LabelInputContainer>
                      <Label htmlFor={`name-${index}`}>
                        Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`name-${index}`}
                        placeholder="Enter name"
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          handleMemberChange(index, "name", e.target.value)
                        }
                        required
                      />
                    </LabelInputContainer>

                    <LabelInputContainer>
                      <Label htmlFor={`rollNo-${index}`}>
                        Roll No <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`rollNo-${index}`}
                        placeholder="Enter roll number"
                        type="text"
                        value={member.rollNo}
                        onChange={(e) =>
                          handleMemberChange(index, "rollNo", e.target.value)
                        }
                        required
                      />
                    </LabelInputContainer>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <LabelInputContainer>
                      <Label htmlFor={`phone-${index}`}>
                        Phone No <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`phone-${index}`}
                        placeholder="(+91) Add country code if other than India"
                        type="tel"
                        value={member.phone}
                        onChange={(e) =>
                          handleMemberChange(index, "phone", e.target.value)
                        }
                        required
                      />
                    </LabelInputContainer>

                    <LabelInputContainer>
                      <Label htmlFor={`email-${index}`}>
                        Email ID <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id={`email-${index}`}
                        placeholder="Enter email"
                        type="email"
                        value={member.email}
                        onChange={(e) =>
                          handleMemberChange(index, "email", e.target.value)
                        }
                        required
                      />
                    </LabelInputContainer>
                  </div>
                </div>
              ))}
            </div>

            <LabelInputContainer className="mt-6">
              <Label htmlFor="projectType">
                Project Type <span className="text-red-500">*</span>
              </Label>
              <div className="relative" ref={dropdownRef}>
                <input
                  type="hidden"
                  name="projectType"
                  id="projectType"
                  value={selectedOption}
                  required
                />
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className={`
            w-full px-4 py-2.5 bg-white dark:bg-neutral-800 
            border rounded-lg cursor-pointer
            flex items-center justify-between
            transition-all duration-200
            ${
              isOpen
                ? "border-neutral-400 dark:border-neutral-500 shadow-md"
                : "border-neutral-200 dark:border-neutral-700"
            }
            hover:border-neutral-400 dark:hover:border-neutral-500
          `}
                >
                  <span className={`${!selectedOption && "text-neutral-500"}`}>
                    {selectedOption
                      ? options.find(
                          (option) => option.value === selectedOption
                        )?.label
                      : "Select project type"}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 
            ${isOpen ? "rotate-180" : ""} 
            text-neutral-500`}
                  />
                </div>

                <div
                  className={`
          absolute w-full mt-2 py-2
          bg-white dark:bg-neutral-800
          border border-neutral-200 dark:border-neutral-700
          rounded-lg shadow-lg z-10
          transition-all duration-200 origin-top
          ${
            isOpen
              ? "opacity-100 transform scale-100"
              : "opacity-0 transform scale-95 pointer-events-none"
          }
        `}
                >
                  {options.map((option, index) => (
                    <div
                      key={option.value}
                      onClick={() => handleSelect(option)}
                      className={`
                px-4 py-2.5 cursor-pointer
                transition-colors duration-150
                hover:bg-neutral-100 dark:hover:bg-neutral-700
                ${
                  index !== options.length - 1 &&
                  "border-b border-neutral-100 dark:border-neutral-700"
                }
              `}
                    >
                      {option.label}
                    </div>
                  ))}
                </div>
              </div>
            </LabelInputContainer>

            <div className="text-center text-gray-600 mt-4 text-xs md:text-sm">
              Already have an account?
              <Link
                href="/login"
                className="text-blue-600 ml-2 hover:underline"
              >
                Sign In
              </Link>
            </div>

            <Button
              className={cn(
                "bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-12 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]",
                { "opacity-50 cursor-not-allowed": isSubmitting }
              )}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
                  Registering...
                </>
              ) : (
                "Submit Registration"
              )}
              <BottomGradient />
            </Button>
          </motion.form>
        </motion.div>
      </motion.div>
    </>
  );
}

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
