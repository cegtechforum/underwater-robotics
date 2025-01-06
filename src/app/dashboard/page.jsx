"use client";

import { signOut, getSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { LogOut, Loader2, Settings } from "lucide-react";
import ProjectContent1 from "./components/Round1/ProjectContent";
import ProjectContent2 from "./components/Round2/ProjectContent";
import { FileUploadInput1 } from "@/app/dashboard/components/Round1/FileUpload";
import { FileUploadInput2 } from "@/app/dashboard/components/Round2/FileUpload";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { SubmissionTemplate } from "./components/Round1/SubmissionTemplate";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import apiCall from "@/lib/apiCall";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

const DashboardSkeleton = () => (
  <div className="w-full max-w-4xl mx-auto space-y-6 p-4">
    <div className="flex flex-col items-center space-y-4">
      <Skeleton className="h-10 w-full max-w-64 bg-gray-200" />
      <Skeleton className="h-6 w-full max-w-48 bg-gray-200" />
    </div>
    <Skeleton className="h-64 w-full bg-gray-200" />
    <div className="space-y-4">
      <Skeleton className="h-16 w-full bg-gray-200" />
      <Skeleton className="h-16 w-full bg-gray-200" />
    </div>
  </div>
);

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [projectType, setProjectType] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isRound1Accepted, setIsRound1Accepted] = useState(false);
  const [isRound1PDFUploaded, setIsRound1PDFUploaded] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isRound2Submitted, setIsRound2Submitted] = useState(false);

  const router = useRouter();

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/" });
    setLoading(false);
  };

  const handleGoToSettings = () => {
    router.push("/dashboard/profile");
  };

  const fetchSessionAndProjectData = useCallback(async () => {
    try {
      const sessionData = await getSession();

      if (!sessionData?.user?.email || sessionData?.user?.role !== "user") {
        router.push("/login");
        return;
      }

      setSession(sessionData);

      try {
        const response = await apiCall(
          "/get-user",
          { email: sessionData.user.email },
          "POST"
        );

        if (response.status === 200) {
          const data = response;
          setProjectType(data.projectType);
          setTeamName(data.teamName);

          if (data.submission) {
            setSubmissionStatus(data.submission.status);
            setIsRound1Accepted(data.submission.status === "APPROVED");
            setIsRound1PDFUploaded(!!data.submission.round1_pdf);
            setIsRound2Submitted(data.submission.round2_pdf !== null);
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    fetchSessionAndProjectData();
  }, [fetchSessionAndProjectData]);

  useEffect(() => {
    const checkSessionValidity = async () => {
      const sessionData = await getSession();
      if (!sessionData?.user?.email || sessionData?.user?.role !== "user") {
        router.push("/login");
      }
    };

    const intervalId = setInterval(checkSessionValidity, 2000);
    return () => clearInterval(intervalId);
  }, [router]);

  if (!session) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center"
      >
        <DashboardSkeleton />
      </motion.div>
    );
  }

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8 lg:p-12 flex flex-col items-center space-y-6 md:space-y-8 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-4 md:top-6 right-4 md:right-6 z-10"
      >
        <Button
          variant="ghost"
          className="group text-blue-600 hover:text-blue-800 transition-colors duration-300 flex items-center space-x-2"
          onClick={handleGoToSettings}
        >
          <Settings className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
          <span className="hidden md:inline">Settings</span>
        </Button>

        <Button
          variant="ghost"
          className="group text-red-600 hover:text-red-800 transition-colors duration-300 flex items-center space-x-2"
          onClick={handleSignOut}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
          ) : (
            <LogOut className="h-4 w-4 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110" />
          )}
          <span className="hidden md:inline">
            {loading ? "Signing Out..." : "Sign Out"}
          </span>
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl text-center space-y-4 md:space-y-6"
      >
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Welcome <span className="text-fuchsia-600">{teamName}</span>
        </h1>
        {projectType && (
          <p className="text-base md:text-xl text-gray-700">
            <strong>Project Type:</strong>{" "}
            <span className="text-indigo-600">
              {projectType.replace(/_/g, " ")}
            </span>
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl px-2 md:px-0"
      >
        {projectType ? (
          <Tabs defaultValue="round1" className="w-full max-w-4xl">
            <TabsList>
              <TabsTrigger value="round1">Round 1</TabsTrigger>
              {isRound1Accepted ? (
                <TabsTrigger value="round2">Round 2</TabsTrigger>
              ) : (
                <TabsTrigger value="round2" disabled>
                  Round 2
                </TabsTrigger>
              )}
            </TabsList>
            {/* Round 1 */}
            <TabsContent value="round1">
              <ProjectContent1 projectType={projectType} />
              <SubmissionTemplate />
              <div className="mt-6">
                <FileUploadInput1
                  email={session.user.email}
                  disabled={
                    isRound1PDFUploaded || submissionStatus === "REJECTED"
                  }
                />
                <div className="mt-3">
                  {submissionStatus === "PENDING" && (
                    <div className="h-16 w-full bg-orange-50 flex items-center justify-center rounded-lg text-justify">
                      <p className="text-orange-600 font-semibold p-3">
                        Your submission is under review.
                      </p>
                    </div>
                  )}
                  {submissionStatus === "REJECTED" && (
                    <div className="h-16 w-full bg-red-50 flex items-center justify-center rounded-lg">
                      <p className="text-red-600 font-semibold p-3">
                        Your submission has been rejected. Thank you for your
                        participation.
                      </p>
                    </div>
                  )}
                  {submissionStatus === "APPROVED" && isRound1PDFUploaded && (
                    <div className="h-16 w-full bg-green-50 flex items-center justify-center rounded-lg">
                      <p className="text-green-600 font-semibold p-3">
                        Your submission has been approved! You can now proceed
                        to Round 2.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Round 2 */}
            <TabsContent value="round2">
              <ProjectContent2 projectType={projectType} />
              <div className="mt-6">
                <FileUploadInput2
                  email={session.user.email}
                  disabled={isRound2Submitted}
                />
              </div>
              <div className="mt-3">
                {isRound2Submitted && (
                  <div className="h-16 w-full bg-teal-50 flex items-center justify-center rounded-lg text-justify">
                    <p className="text-teal-600 font-semibold p-3">
                      Your Round 2 submission has been received. Thank you for
                      participating! Results will be announced shortly.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <Skeleton className="h-64 w-full bg-gray-200" />
        )}
      </motion.div>
    </motion.div>
    <Footer variant="default" />
    </>
  );
};

export default Dashboard;
