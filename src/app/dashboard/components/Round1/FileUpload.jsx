"use client";
import React, { useState, useEffect } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast, Toaster } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import apiCall from "@/lib/apiCall";
import { Loader2 } from "lucide-react";

export function FileUploadInput1({ email, disabled }) {
  const [files, setFiles] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  useEffect(() => {
    const checkDeadline = () => {
      // const deadline = new Date("2025-02-06T00:00:00+05:30");
      const deadline = new Date("2025-02-08T18:45:00+05:30");
      const currentDate = new Date();
      setIsDeadlinePassed(currentDate >= deadline);
    };

    checkDeadline();

    const interval = setInterval(checkDeadline, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleFileUpload = (uploadedFiles) => {
    setFiles([uploadedFiles]);
  };

  const handleConfirmSubmit = async () => {
    if (isDeadlinePassed) {
      toast.error("Submission deadline has passed.");
      return;
    }

    if (files.length === 0) {
      toast.error("No file uploaded. Please upload a file first.");
      return;
    }

    const file = files[0];
    if (!(file instanceof Blob)) {
      toast.error("Invalid file type. Please upload a valid file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = async () => {
      const fileBase64 = reader.result.split(",")[1];
      const payload = {
        email,
        fileName: file.name,
        fileType: file.type,
        fileContent: fileBase64,
      };

      setLoading(true);

      try {
        const response = await apiCall("/round1_submission", payload, "POST", {
          "Content-Type": "application/json",
        });

        if (response.status === 200) {
          toast.success(
            "Your submission was successful. We will review it shortly!"
          );
          setIsSubmitted(true);
          setShowDialog(false);
        } else {
          const errorData = response;
          console.error("Error submitting file:", errorData);
          toast.error(
            errorData.error || "Something went wrong. Please try again."
          );
        }
      } catch (error) {
        console.error("Error submitting file:", error);
        toast.error("Failed to submit the file. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleOpenDialog = () => {
    if (files.length === 0) {
      toast.error("Please upload a file before submitting.");
      return;
    }
    setShowDialog(true);
  };

  const handleCancelDialog = () => {
    setShowDialog(false);
  };

  const isButtonDisabled =
    isSubmitted || disabled || loading || isDeadlinePassed;

  return (
    <>
      <Toaster />
      <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg p-4">
        <FileUpload
          onChange={handleFileUpload}
          disabled={isSubmitted || disabled || isDeadlinePassed}
        />
        <div className="mt-4 flex justify-center">
          <Button
            onClick={handleOpenDialog}
            disabled={isButtonDisabled}
            className={`${
              isButtonDisabled
                ? "bg-gray-400 hover:bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-black text-white hover:bg-black/80 transition duration-300"
            }`}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : isSubmitted ? (
              "Submitted"
            ) : !isSubmitted && isDeadlinePassed ? (
              "Submission Closed"
            ) : (
              "Submit"
            )}
          </Button>
        </div>

        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Once submitted, the document can&apos;t be altered. Are you sure
                you want to submit?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDialog}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmSubmit}
                disabled={isSubmitted || isDeadlinePassed}
              >
                {isSubmitted ? "Submitted" : "Submit"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default FileUploadInput1;
