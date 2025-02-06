import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardDrive, Box, FileSpreadsheet } from "lucide-react";

const TeamStatistics = ({ teams }) => {
  const submitted = useMemo(() => teams.filter((team) => team.submission).length, [teams]);
  const notSubmitted = useMemo(() => teams.length - submitted, [teams]);
  
  const stats = useMemo(() => {
    const counts = teams.reduce((acc, team) => {
      const type = team.projectType || "";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return [
      {
        name: "Project Proposal",
        count: counts["PROJECT_PROPOSAL"] || 0,
        icon: FileSpreadsheet,
        borderColor: "border-purple-500",
        bgColor: "bg-purple-50",
        textColor: "text-purple-600",
      },
      {
        name: "Simulation",
        count: counts["SIMULATION"] || 0,
        icon: Box,
        borderColor: "border-green-500",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
      },
      {
        name: "Hardware Demo",
        count: counts["HARDWARE_DEMO"] || 0,
        icon: HardDrive,
        borderColor: "border-blue-500",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
      },
    ];
  }, [teams]);

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-white shadow-md rounded-lg">
      <CardHeader className="border-b pb-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Project Type Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`border-l-4 ${stat.borderColor} ${stat.bgColor} p-5 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-200`}
              >
                <div className="flex items-center">
                  <div
                    className={`p-2 rounded-full bg-white shadow-md ${stat.textColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-3 text-base font-medium ${stat.textColor}`}
                  >
                    {stat.name}
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-gray-900">
                    {stat.count}
                  </span>
                  <span className="ml-2 text-sm text-gray-600">teams</span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-6 pt-4 border-t text-right text-sm text-gray-600">
          Submitted: <span className="font-semibold">{submitted}</span>
          <span className="mx-2">|</span>
          Not Submitted: <span className="font-semibold">{notSubmitted}</span>
          <span className="mx-2">|</span>
          Total Teams: <span className="font-semibold">{teams.length}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamStatistics;
