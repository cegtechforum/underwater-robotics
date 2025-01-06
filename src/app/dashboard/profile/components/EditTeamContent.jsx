"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "react-hot-toast";
import { getSession } from "next-auth/react";
import apiCall from "@/lib/apiCall";
import { Loader2 } from "lucide-react";

const TeamHelpSection = () => {
  const [message, setMessage] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const session = await getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      } else {
        toast.error("Unable to fetch user email.");
      }
    };

    fetchUserEmail();
  }, []);

  const handleSubmit = async () => {
    if (message.trim()) {
      setLoading(true);
      try {
        const response = await apiCall(
          "/submit-request",
          { email: userEmail, message },
          "POST"
        );

        if (response.status === 200) {
          toast.success("Request submitted successfully!");
          setMessage("");
        } else {
          toast.error("Failed to submit request.");
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please describe your issue before submitting.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg text-justify mt-12">
      <Toaster />

      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Support</h2>
        <p className="text-gray-500 mt-2">
          Experiencing issues with team editing or any other issues? We&apos;re
          here to help.
        </p>
      </div>

      <Textarea
        placeholder="Describe your specific team management issue..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full mb-4 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200"
        rows={5}
      />

      <Button
        onClick={handleSubmit}
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-12 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
            Submitting Request...
          </>
        ) : (
          "Submit Support Request"
        )}
      </Button>
    </div>
  );
};

export default TeamHelpSection;
