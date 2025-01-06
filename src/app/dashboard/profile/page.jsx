"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { User, Lock, Users, LogOut, ArrowLeft, Loader2 } from "lucide-react";
import { signOut, getSession } from "next-auth/react";
import ProfileContent from "@/app/dashboard/profile/components/ProfileContent";
import ChangePasswordContent from "@/app/dashboard/profile/components/ChangePasswordContent";
import EditTeamContent from "@/app/dashboard/profile/components/EditTeamContent";
import Footer from "@/components/Footer";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeItem, setActiveItem] = useState("Profile");
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }

  const checkMobileView = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    checkMobileView();

    const debouncedCheckMobileView = debounce(checkMobileView, 200);
    window.addEventListener("resize", debouncedCheckMobileView);

    return () => {
      window.removeEventListener("resize", debouncedCheckMobileView);
    };
  }, [checkMobileView]);

  useEffect(() => {
    const fetchSessionData = async () => {
      const sessionData = await getSession();

      if (!sessionData?.user?.email || sessionData?.user?.role !== "user") {
        router.push("/");
        return;
      }

      // setSession(sessionData);
    };

    fetchSessionData();
  }, [router]);

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

  const handleSignOut = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/" });
    setLoading(false);
  };

  const sidebarItems = [
    { label: "Profile", icon: User, content: <ProfileContent /> },
    {
      label: "Change Password",
      icon: Lock,
      content: <ChangePasswordContent />,
    },
    { label: "Support", icon: Users, content: <EditTeamContent /> },
    {
      label: "Sign Out",
      icon: LogOut,
      isSignOut: true,
      onClick: handleSignOut,
    },
  ];

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
      return;
    }
    setActiveItem(item.label);
  };

  return (
    <>
      <div className="flex min-h-screen">
        {!isMobile && (
          <div
            className={`fixed top-0 left-0 h-screen bg-white 
          border-r shadow-lg transition-all duration-300 ease-in-out
          flex flex-col ${isExpanded ? "w-64" : "w-20"} z-50`}
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
          >
            <div className="p-4 flex items-center">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center p-2 rounded-full hover:bg-slate-100"
              >
                <ArrowLeft className="text-slate-700 hover:text-slate-600 h-6 w-6" />
                {isExpanded && (
                  <span className="ml-2 text-slate-700 font-medium">Back</span>
                )}
              </button>
            </div>
            <nav className="flex-grow px-2 space-y-2">
              {sidebarItems.map((item) => (
                <div
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  disabled={item.isSignOut && loading}
                  className={`flex items-center rounded-lg cursor-pointer group transition-all duration-300 
                  ${
                    activeItem === item.label
                      ? "bg-blue-100 text-blue-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }
                  ${item.isSignOut ? "text-red-500 hover:bg-red-50" : ""}`}
                >
                  <div className="p-3">
                    {item.isSignOut && loading ? (
                      <Loader2 color="#dc2626" className="animate-spin h-5 w-5 mr-2 inline" />
                    ) : (
                      <item.icon
                        size={20}
                        className={`h-5 w-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${
                          item.isSignOut ? "text-red-500" : ""
                        }`}
                      />
                    )}
                  </div>
                  {isExpanded && (
                    <span
                      className={`ml-3 ${item.isSignOut ? "text-red-600" : ""}`}
                    >
                      {item.label}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}

        {isMobile && (
          <div className="w-full fixed top-0 bg-white shadow-lg z-50">
            <div className="flex justify-between items-center px-4 py-2 border-b">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex items-center p-2 text-slate-700"
              >
                <ArrowLeft className="mr-2 h-6 w-6" />
                <span>Back</span>
              </button>
            </div>
            <div className="flex justify-around py-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleItemClick(item)}
                  disabled={item.isSignOut && loading}
                  className={`flex flex-col items-center text-sm ${
                    activeItem === item.label
                      ? "text-blue-600"
                      : "text-slate-500"
                  } ${item.isSignOut ? "text-red-500" : ""}`}
                >
                  {item.isSignOut && loading ? (
                    <Loader2
                      color="#dc2626"
                      className="animate-spin h-5 w-5 mr-2 inline"
                    />
                  ) : (
                    <item.icon
                      size={20}
                      className="h-5 w-5 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                    />
                  )}
                  <span
                    className={`${
                      item.isSignOut && loading ? "text-red-500" : ""
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <main
          className={`flex-grow p-6 ${
            isMobile ? "mt-32" : isExpanded ? "ml-64" : "ml-20"
          }`}
        >
          {sidebarItems.find((item) => item.label === activeItem)?.content}
        </main>
      </div>
      <Footer variant="default" />
    </>
  );
};

export default Sidebar;
