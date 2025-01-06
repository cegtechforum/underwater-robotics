"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { getSession } from 'next-auth/react';
import { 
  Building2, Mail, Phone, UserCircle, 
  IdCard, MapPin, GraduationCap  
} from 'lucide-react';
import apiCall from '@/lib/apiCall';

const ProfileContent = () => {
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [session, setSession] = useState(null);

  const fetchSessionAndTeamData = useCallback(async () => {
    try {
      const sessionData = await getSession();
      setSession(sessionData);
  
      if (sessionData?.user?.email) {
        const response = await apiCall(
          "/get-team",
          { email: sessionData.user.email },
          "POST"
        );
  
        if (response.status === 200) {
          const data = response;
          setTeamData(data.team);
        } else {
          throw new Error("Failed to fetch team data");
        }
      } else {
        throw new Error("No user email found in session");
      }
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchSessionAndTeamData();
  }, [fetchSessionAndTeamData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!teamData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        No team data found
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-2">
              {teamData.teamName}
            </h2>
            <div className="flex items-center space-x-3">
              <Building2 className="text-blue-200" size={24} />
              <span className="text-lg">{teamData.collegeName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Details Grid */}
      <div className="grid md:grid-cols-2 gap-6 p-6 bg-gray-50">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-blue-500 pb-3 mb-4">
            Team Details
          </h3>
          <div className="space-y-4">
            <DetailRow 
              icon={<MapPin size={22} className="text-green-600" />} 
              label="District" 
              value={teamData.district} 
            />
            <DetailRow 
              icon={<Mail size={22} className="text-red-600" />} 
              label="Team Email" 
              value={teamData.email} 
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-800 border-b-2 border-purple-500 pb-3 mb-4">
            Mentor Information
          </h3>
          <div className="space-y-4">
            <DetailRow 
              icon={<UserCircle size={22} className="text-purple-600" />} 
              label="Mentor Name" 
              value={teamData.mentorName || "Not Provided"} 
            />
            <DetailRow 
              icon={<Mail size={22} className="text-orange-600" />} 
              label="Mentor Email" 
              value={teamData.mentorEmail || "Not Provided"} 
            />
            <DetailRow 
              icon={<Phone size={22} className="text-green-600" />} 
              label="Mentor Phone" 
              value={teamData.mentorPhone || "Not Provided"} 
            />
          </div>
        </div>
      </div>

      <div className="p-6 bg-white">
        <h3 className="text-3xl font-bold text-gray-800 border-b-2 border-indigo-500 pb-3 mb-6">
          Team Members
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {teamData.teamMembers.map((member, index) => (
            <TeamMemberCard key={member.id || index} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamMemberCard = ({ member, index }) => {
  const colorVariants = [
    'border-blue-500 bg-blue-50',
    'border-green-500 bg-green-50',
    'border-purple-500 bg-purple-50',
    'border-teal-500 bg-teal-50'
  ];

  const selectedColor = colorVariants[index % colorVariants.length];

  return (
    <div className={`border-2 ${selectedColor} rounded-xl p-6 shadow-lg transform transition-all hover:scale-105 hover:shadow-xl`}>
      <div className="flex items-center mb-4">
        <div className="bg-white p-3 rounded-full shadow-md mr-4">
          <GraduationCap size={32} className="text-indigo-600" />
        </div>
        <div>
          <h4 className="text-xl font-bold text-gray-800">{member.name}</h4>
        </div>
      </div>
      
      <div className="space-y-3">
        <DetailRow 
          icon={<IdCard size={20} className="text-gray-500" />} 
          label="Roll Number" 
          value={member.rollNo} 
        />
        <DetailRow 
          icon={<Phone size={20} className="text-green-600" />} 
          label="Phone" 
          value={member.phone} 
        />
        <DetailRow 
          icon={<Mail size={20} className="text-red-600" />} 
          label="Email" 
          value={member.email} 
        />
      </div>
    </div>
  );
};

const DetailRow = ({ icon, label, value }) => (
  <div className="flex items-center space-x-4">
    {icon}
    <div>
      <p className="text-sm text-gray-500 font-medium">{label}</p>
      <p className="text-gray-800 font-semibold">{value || "Not Provided"}</p>
    </div>
  </div>
);

export default ProfileContent;
