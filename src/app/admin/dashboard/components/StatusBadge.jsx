"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

const StatusBadge = ({ status }) => {
  const statusColors = {
    PENDING: "bg-amber-100 text-amber-800 border-amber-200",
    APPROVED: "bg-emerald-100 text-emerald-800 border-emerald-200",
    REJECTED: "bg-rose-100 text-rose-800 border-rose-200",
  };

  return (
    <Badge
      variant="outline"
      className={`${statusColors[status]} font-semibold`}
    >
      {status}
    </Badge>
  );
};

export default StatusBadge;
