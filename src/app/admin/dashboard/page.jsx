"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, BellRing, ArrowUp, RefreshCw } from "lucide-react";
import TeamCard from "./components/TeamCard";
import TeamDetailsPage from "./components/TeamDetailsPage";
import Footer from "@/components/Footer";
import TeamStatistics from "./components/TeamStatistics";
import { toast, Toaster } from "react-hot-toast";
import apiCall from "@/lib/apiCall";

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([]);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [signoutLoading, setSignoutLoading] = useState(false);
  const [sendingEmails, setSendingEmails] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [skip, setSkip] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  
  const loaderRef = useRef(null);
  const router = useRouter();

  const fetchTeams = async (skipCount, isRetry = false) => {
    try {
      const response = await apiCall(`/get-all-teams?skip=${skipCount}`, null, "GET");

      if (response.status === 200) {
        if (skipCount === 0) {
          setTeams(response.teams);
        } else {
          setTeams(prev => [...prev, ...response.teams]);
        }
        setHasMore(response.hasMore);
        setSkip(skipCount + 50);
        setTotalCount(response.totalCount);
        setRetryCount(0);
      } else {
        throw new Error(response.message || "Failed to fetch teams");
      }
    } catch (error) {
      console.error("An error occurred while fetching teams:", error);
      if (!isRetry) {
        toast.error("Failed to load teams. Retrying...");
        if (retryCount < 3) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => fetchTeams(skipCount, true), 2000);
        } else {
          toast.error("Failed to load teams after multiple attempts");
        }
      }
      throw error;
    }
  };

  const fetchSessionAndTeamData = useCallback(async () => {
    setLoading(true);
    try {
      const sessionData = await getSession();
      setSession(sessionData);

      if (!sessionData?.user?.email || sessionData.user.role !== "admin") {
        router.push("/admin/login");
        return;
      }

      await fetchTeams(0);
    } catch (error) {
      console.error("Error fetching session data:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const loadMoreTeams = async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      await fetchTeams(skip);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleManualLoadMore = () => {
    loadMoreTeams();
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    setRetryCount(0);
    fetchTeams(skip);
  };

  const handleViewDetails = (team) => {
    setSelectedTeam(team);
    setCurrentView("team-details");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedTeam(null);
  };

  const handleStatusChange = (team, newStatus) => {
    setTeams(prevTeams =>
      prevTeams.map(t =>
        t.teamName === team.teamName 
          ? { ...t, submissionStatus: newStatus }
          : t
      )
    );
  };

  const handleDeleteTeam = (teamToDelete) => {
    setTeams(prevTeams =>
      prevTeams.filter(t => t.teamName !== teamToDelete.teamName)
    );
    handleBackToDashboard();
  };

  const handleSignOut = async () => {
    setSignoutLoading(true);
    try {
      await signOut({ callbackUrl: "/" });
    } finally {
      setSignoutLoading(false);
    }
  };

  const handleSendReminders = async () => {
    if (sendingEmails) return;

    setSendingEmails(true);
    try {
      const emails = teams.map((team) => team.email).filter((email) => email);

      if (emails.length === 0) {
        toast.error("No valid email addresses found");
        return;
      }

      const batchSize = 5;
      const batches = [];
      for (let i = 0; i < emails.length; i += batchSize) {
        batches.push(emails.slice(i, i + batchSize));
      }

      let totalSuccess = 0;
      let failedEmails = [];

      for (let i = 0; i < batches.length; i++) {
        try {
          if (i > 0) {
            await new Promise((resolve) => setTimeout(resolve, 2000));
          }

          const response = await apiCall(
            "/reminder-mail",
            { emails: batches[i] },
            "POST"
          );

          if (response.status === 200) {
            if (response.results) {
              const successes = response.results.filter(r => r.status === "success");
              const failures = response.results.filter(r => r.status === "failed");

              totalSuccess += successes.length;
              failedEmails.push(...failures.map(f => f.email));
            } else {
              totalSuccess += batches[i].length;
            }
          } else {
            failedEmails.push(...batches[i]);
          }

          toast.success(
            `Progress: ${totalSuccess} sent (Batch ${i + 1}/${batches.length})`
          );
        } catch (error) {
          failedEmails.push(...batches[i]);
          console.error(`Batch ${i + 1} error:`, error);
        }
      }

      if (totalSuccess > 0) {
        toast.success(`Successfully sent ${totalSuccess} emails`);
      }

      if (failedEmails.length > 0) {
        const failedMessage =
          failedEmails.length > 3
            ? `${failedEmails.slice(0, 3).join(", ")} and ${
                failedEmails.length - 3
              } more`
            : failedEmails.join(", ");

        toast.error(`Failed to send emails to: ${failedMessage}`);
      }
    } catch (error) {
      toast.error(error.message || "Failed to send emails");
    } finally {
      setSendingEmails(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchSessionAndTeamData();
  }, [fetchSessionAndTeamData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loadingMore && currentView === "dashboard") {
          loadMoreTeams();
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, currentView]);

  useEffect(() => {
    const checkSessionValidity = async () => {
      const sessionData = await getSession();
      if (!sessionData?.user?.email || sessionData.user.role !== "admin") {
        router.push("/admin/login");
      }
    };

    const intervalId = setInterval(checkSessionValidity, 2000);
    return () => clearInterval(intervalId);
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="bg-gradient-to-br from-indigo-50 to-white min-h-screen">
        <div className="container mx-auto p-6 space-y-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-800 text-center flex-1">
              Team Details
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSendReminders}
                className="bg-none border border-transparent text-blue-600 px-4 py-2 rounded-md hover:text-blue-700 hover:border-blue-700 transition-colors duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={sendingEmails}
              >
                {!sendingEmails ? (
                  <>
                    <BellRing className="h-4 w-4" />
                    <span className="hidden md:inline">Send Reminders</span>
                  </>
                ) : (
                  <>
                    <Loader2 className="animate-spin h-4 w-4" />
                    <span className="hidden md:inline">Sending...</span>
                  </>
                )}
              </button>
              <button
                onClick={handleSignOut}
                className="text-red-600 hover:text-red-800 transition-colors duration-300 flex items-center space-x-2"
                disabled={signoutLoading}
              >
                {!signoutLoading ? (
                  <LogOut className="h-4 w-4 transition-transform duration-300 hover:rotate-6 hover:scale-110" />
                ) : (
                  <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
                )}
                <span className="hidden md:inline">
                  {signoutLoading ? "Signing Out..." : "Sign Out"}
                </span>
              </button>
            </div>
          </div>

          {currentView === "dashboard" && (
            <TeamStatistics teams={teams} totalCount={totalCount} />
          )}

          {currentView === "dashboard" && (
            <>
              {teams.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map((team, index) => (
                    <TeamCard
                      key={`${team.teamName}-${index}`}
                      team={team}
                      onViewDetails={handleViewDetails}
                      className="animate-fadeIn"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600 font-medium">
                  No teams found
                  <button
                    onClick={handleRetry}
                    className="ml-2 text-blue-500 hover:text-blue-600"
                  >
                    <RefreshCw className="h-4 w-4 inline" />
                    Retry
                  </button>
                </div>
              )}

              {hasMore && (
                <div className="flex flex-col items-center p-4 space-y-4">
                  <div ref={loaderRef}></div>
                  {loadingMore ? (
                    <Loader2 className="animate-spin h-6 w-6 text-blue-500" />
                  ) : (
                    <button
                      onClick={handleManualLoadMore}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
                    >
                      Load More Teams
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {currentView === "team-details" && selectedTeam && (
            <TeamDetailsPage
              team={selectedTeam}
              onBack={handleBackToDashboard}
              onStatusChange={handleStatusChange}
              onDeleteTeam={handleDeleteTeam}
            />
          )}

          {showScrollTop && (
            <button
              onClick={handleScrollToTop}
              className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-colors duration-300"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-6 w-6" />
            </button>
          )}
        </div>
      </div>
      <Footer variant="default" />
    </>
  );
};

export default AdminDashboard;