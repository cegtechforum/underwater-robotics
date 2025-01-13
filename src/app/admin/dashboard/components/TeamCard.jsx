"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { School, MapPin, FileText, LayoutGrid } from "lucide-react";
import StatusBadge from "./StatusBadge";

const TeamCard = ({ team, onViewDetails }) => {
  return (
    <Card
      className="w-full max-w-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-lg"
      onClick={() => onViewDetails(team)}
    >
      <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex flex-row items-center justify-between space-y-0 pb-2 p-4 rounded-t-xl">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <div className="w-5 h-5 flex-shrink-0">
            <LayoutGrid className="w-full h-full" />
          </div>
          {team.teamName}
        </CardTitle>
        <StatusBadge status={team.submission != null ? team.submission.status : "No Status"} />
      </CardHeader>

      <CardContent className="p-4 bg-gray-50">
        <div className="grid gap-3">
          {[
            { icon: School, text: team.collegeName },
            { icon: MapPin, text: team.district },
            { icon: FileText, text: team.projectType },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-3 p-2 rounded-lg"
            >
              <div className="w-5 h-5 flex-shrink-0">
                <Icon className="w-full h-full text-indigo-500" />
              </div>
              <span className="text-black font-medium">{text}</span>
            </div>
          ))}
        </div>
      </CardContent>

      <div className="relative">
  <CardFooter className="absolute bottom-0 w-full bg-gray-100 p-4 text-sm text-gray-500 font-medium rounded-b-xl">
    Click to view full details
  </CardFooter>
</div>

    </Card>
  );
};

export default TeamCard;