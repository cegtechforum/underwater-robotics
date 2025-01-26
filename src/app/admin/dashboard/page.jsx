"use client";

import React, { useState, useEffect, useCallback } from "react";
import { signOut, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2, BellRing } from "lucide-react";
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

  const router = useRouter();

  const fetchSessionAndTeamData = useCallback(async () => {
    setLoading(true);

    try {
      const sessionData = await getSession();
      setSession(sessionData);

      if (!sessionData?.user?.email || sessionData.user.role !== "admin") {
        router.push("/admin/login");
        return;
      }

      try {
        const response = await apiCall("/get-all-teams", null, "GET");

        if (response.status === 200) {
          setTeams(response.teams);
          // console.log("Teams after apiCall:", response.teams);
        } else {
          console.error("Error fetching teams:", response.message);
        }
      } catch (error) {
        console.error("An error occurred while fetching teams:", error);
      }
    } catch (error) {
      console.error("Error fetching session data:", error);
      router.push("/admin/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchSessionAndTeamData();
  }, [fetchSessionAndTeamData]);

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

  useEffect(() => {
    if (!loading && !session) {
      router.push("/admin/login");
    }
  }, [session, loading, router]);

  const handleViewDetails = (team) => {
    setSelectedTeam(team);
    setCurrentView("team-details");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
    setSelectedTeam(null);
  };

  const handleStatusChange = (team, newStatus) => {
    const updatedTeams = teams.map((t) =>
      t.teamName === team.teamName ? { ...t, submissionStatus: newStatus } : t
    );
    setTeams(updatedTeams);
  };

  const handleDeleteTeam = (teamToDelete) => {
    const updatedTeams = teams.filter(
      (t) => t.teamName !== teamToDelete.teamName
    );
    setTeams(updatedTeams);
    handleBackToDashboard();
  };

  const handleSignOut = async () => {
    setSignoutLoading(true);
    await signOut({ callbackUrl: "/" });
    setSignoutLoading(false);
  };

  const handleSendReminders = async () => {
    if (sendingEmails) return;

    setSendingEmails(true);
    try {
      const response = await apiCall("/reminder-mail", { teams }, "POST");

      const data = response;

      if (response.status === 200) {
        toast.success(data.message);
      } else {
        throw new Error(data.error || "Failed to send emails");
      }
    } catch (error) {
      // console.error("Error sending reminders:", error);
      toast.error(error.message);
    } finally {
      setSendingEmails(false);
    }
  };

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
          {/* Hide TeamStatistics if a team card is clicked */}
          {currentView === "dashboard" && <TeamStatistics teams={teams} />}
          {currentView === "dashboard" && (
            <>
              {teams.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map((team, index) => (
                    <TeamCard
                      key={index}
                      team={team}
                      onViewDetails={handleViewDetails}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600 font-medium">
                  No teams found
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
        </div>
      </div>
      <Footer variant="default" />
    </>
  );
};

export default AdminDashboard;
