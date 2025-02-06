"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Trash2,
  LayoutGrid,
  User,
  Mail,
  MapPin,
  School,
  FileText,
  Phone,
  Key,
  Download,
  Loader2,
  Info,
} from "lucide-react";
import StatusBadge from "./StatusBadge";
import { Badge } from "@/components/ui/badge";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { toast, Toaster } from "react-hot-toast";
import apiCall from "@/lib/apiCall";

const TeamDetailsPage = ({ team, onBack, onStatusChange, onDeleteTeam }) => {
  const [selectedStatus, setSelectedStatus] = useState(
    team.submission != null ? team.submission.status : "No Status"
  );
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] =
    useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [isStatusChanged, setIsStatusChanged] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStatusSubmitting, setIsStatusSubmitting] = useState(false);
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTeam = async () => {
    if (team && team.email) {
      try {
        setIsDeleting(true);
        const response = await apiCall(
          "/delete-team",
          { email: team.email },
          "DELETE"
        );
        if (response.status === 200) {
          toast.success("Team deleted successfully.");
          onDeleteTeam(team);
        } else {
          toast.error("Failed to delete the team.");
        }
      } catch (error) {
        toast.error("An error occurred while deleting the team.");
        console.error(error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
    setIsStatusChanged(newStatus !== team.submissionStatus);
  };

  const handleUpdateStatus = async () => {
    if (onStatusChange && isStatusChanged && selectedStatus) {
      try {
        setIsStatusSubmitting(true);
        const response = await apiCall(
          "/status-update",
          {
            email: team.email,
            status: selectedStatus,
          },
          "POST"
        );
        if (response.status === 200) {
          toast.success("Status updated successfully.");
          setIsStatusChanged(false);
          onStatusChange(team, selectedStatus);
        } else {
          toast.error("Failed to update status.");
        }
      } catch (error) {
        toast.error("An error occurred while updating the status.");
        console.error(error);
      } finally {
        setIsStatusSubmitting(false);
      }
    }
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await apiCall(
        "/admin-team-password-reset",
        {
          email: team.email,
          newPassword: newPassword,
        },
        "POST"
      );
      if (response.status === 200) {
        toast.success("Password reset successfully.");
        setIsResetPasswordDialogOpen(false);
        setNewPassword("");
      } else {
        toast.error("Failed to reset password.");
      }
    } catch (error) {
      toast.error("An error occurred while resetting the password.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  //     if (pdfFile) {
  //       try {
  //         const pdfData =
  //           pdfFile instanceof Uint8Array
  //             ? pdfFile
  //             : new Uint8Array(Object.values(pdfFile));
  //         if (pdfData.length === 0) {
  //           console.error("PDF data is empty");
  //           return;
  //         }
  //         const blob = new Blob([pdfData], { type: "application/pdf" });
  //         if (blob.size === 0) {
  //           console.error("Blob creation failed or resulted in 0 bytes");
  //           return;
  //         }
  //         const url = URL.createObjectURL(blob);
  //         const link = document.createElement("a");
  //         link.href = url;
  //         link.download = `${roundLabel}_Document.pdf`;
  //         document.body.appendChild(link);
  //         link.click();
  //         document.body.removeChild(link);
  //         URL.revokeObjectURL(url);
  //       } catch (error) {
  //         console.error("Download error:", error);
  //       }
  //     } else {
  //       console.error("No PDF file provided");
  //     }
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Toaster />
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Header Section */}
          <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3 w-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                  onClick={onBack}
                >
                  <ArrowLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </Button>
                <div className="flex items-center gap-2 flex-grow">
                  <LayoutGrid className="h-6 w-6 sm:h-7 sm:w-7" />
                  <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
                    {team.teamName}
                  </h1>
                </div>
              </div>
              <div className="w-full items-center flex justify-center sm:justify-end gap-2">
                <StatusBadge status={selectedStatus} />
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4 sm:p-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Team Information Section */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 border-b-2 border-indigo-200 pb-2 mb-4">
                  Team Information
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { icon: School, label: "College", value: team.collegeName },
                    { icon: MapPin, label: "District", value: team.district },
                    { icon: Mail, label: "Email", value: team.email },
                    {
                      icon: FileText,
                      label: "Project Type",
                      value: team.projectType,
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <Icon className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                      <div className="flex-grow min-w-0">
                        <span className="text-sm text-gray-500 block">
                          {label}
                        </span>
                        <p className="font-medium text-gray-800 truncate">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentor Information Section */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 border-b-2 border-indigo-200 pb-2 mb-4">
                  Mentor Information
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      icon: User,
                      label: "Name",
                      value: team.mentorName || "Not provided",
                    },
                    {
                      icon: Mail,
                      label: "Email",
                      value: team.mentorEmail || "Not provided",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: team.mentorPhone || "Not provided",
                    },
                  ].map(({ icon: Icon, label, value }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm"
                    >
                      <Icon className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                      <div className="flex-grow min-w-0">
                        <span className="text-sm text-gray-500 block">
                          {label}
                        </span>
                        <p className="font-medium text-gray-800 truncate">
                          {value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submissions Section */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 border-b-2 border-indigo-200 pb-2 mb-4">
                  Submissions
                </h2>
                <div className="space-y-3">
                  {[
                    {
                      label: `${team.teamName} Round1 PDF`,
                      submitted: team.submission?.round1 ?? false,
                    },
                    {
                      label: `${team.teamName} Round2 PDF`,
                      submitted: team.submission?.round2 ?? false,
                    },
                  ].map(({ label, submitted }) => (
                    <div
                      key={label}
                      className="bg-white p-4 rounded-lg shadow-sm flex flex-wrap sm:flex-nowrap items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                        <span className="font-medium text-gray-800 truncate">
                          {label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 ml-auto">
                        {submitted && (
                          <div className="relative group">
                            <Info className="h-5 w-5 text-indigo-500 cursor-pointer" />
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-1 px-3 py-2 w-48 sm:w-64 md:w-72 lg:w-80 text-sm bg-indigo-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              Contact Sudeep to view the submitted PDF
                            </div>
                          </div>
                        )}
                        <Badge
                          variant="outline"
                          className={`${
                            submitted
                              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                              : "bg-red-100 text-red-800 border-red-200"
                          }`}
                        >
                          {submitted ? "Submitted" : "Not Submitted"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Team Members Section */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 border-b-2 border-indigo-200 pb-2 mb-4">
                  Team Members
                </h2>
                <div className="space-y-4">
                  {team.teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { icon: User, label: "Name", value: member.name },
                          {
                            icon: FileText,
                            label: "Roll No",
                            value: member.rollNo,
                          },
                          { icon: Mail, label: "Email", value: member.email },
                          { icon: Phone, label: "Phone", value: member.phone },
                        ].map(({ icon: Icon, label, value }) => (
                          <div key={label} className="flex items-center gap-3">
                            <Icon className="h-5 w-5 text-indigo-500 flex-shrink-0" />
                            <div className="min-w-0">
                              <span className="text-xs text-gray-500 block">
                                {label}
                              </span>
                              <span className="text-sm text-gray-800 truncate block">
                                {value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Status Section */}
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <h2 className="text-lg sm:text-xl font-semibold text-indigo-800 border-b-2 border-indigo-200 pb-2 mb-4">
                  Team Status
                </h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Select
                    value={selectedStatus}
                    onValueChange={handleStatusChange}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        value="PENDING"
                        className="hover:bg-indigo-100 transition duration-200 ease-in-out"
                      >
                        Pending
                      </SelectItem>
                      <SelectItem
                        value="APPROVED"
                        className="hover:bg-indigo-100 transition duration-200 ease-in-out"
                      >
                        Approved
                      </SelectItem>
                      <SelectItem
                        value="REJECTED"
                        className="hover:bg-indigo-100 transition duration-200 ease-in-out"
                      >
                        Rejected
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    onClick={handleUpdateStatus}
                    disabled={!isStatusChanged || isStatusSubmitting}
                    className="w-full sm:w-auto mt-2 sm:mt-0 bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300"
                  >
                    {isStatusSubmitting ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="animate-spin mr-2 w-5 h-5" />
                        <span>Updating...</span>
                      </div>
                    ) : (
                      "Update Status"
                    )}
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Reset Password Dialog */}
                <Dialog
                  open={isResetPasswordDialogOpen}
                  onOpenChange={setIsResetPasswordDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full text-indigo-600 border-indigo-600 hover:bg-indigo-100"
                    >
                      <Key className="mr-2 h-4 w-4" />
                      Reset Password
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px] bg-white text-black">
                    <DialogHeader>
                      <DialogTitle>Reset Password</DialogTitle>
                      <DialogDescription>
                        Enter a new password for the team.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Team Email
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          value={team.email}
                          disabled
                          className="w-full p-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="newPassword"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </Label>
                        <div className="relative">
                          <Input
                            type={passwordVisible ? "text" : "password"}
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full py-2 md:py-2.5 px-3 md:px-4 border-gray-300 focus:ring-2 focus:ring-blue-500 pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                          >
                            {passwordVisible ? (
                              <IconEyeOff className="w-5 h-5" />
                            ) : (
                              <IconEye className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={handleResetPassword}
                        className="w-full sm:w-auto bg-blue-600 text-white disabled:bg-blue-300 hover:bg-blue-700 active:bg-blue-800 transition duration-200 ease-in-out"
                        disabled={isSubmitting || newPassword.length < 8}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            <span>Resetting...</span>
                          </div>
                        ) : (
                          "Reset Password"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {/* Delete Team Dialog */}
                <AlertDialog open={open} onOpenChange={setOpen}>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <div className="flex items-center justify-center">
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          <span>Deleting...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete Team</span>
                        </div>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the team.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-2">
                      <AlertDialogCancel
                        onClick={() => setOpen(false)}
                        className="w-full sm:w-auto"
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteTeam}
                        className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetailsPage;
