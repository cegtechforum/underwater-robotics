import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Trophy } from "lucide-react";
import {
  projectProposalResults,
  softwareSimulationResults,
  hardwareDemoResults,
} from "@/constants/Result/resultsData";

const ResultsDialog = ({ open, onOpenChange, trigger }) => {
  const renderTable = (title, results) => (
    <div className="my-4 sm:my-6 bg-black/80 rounded-xl border-2 border-gray-700/80 px-4 sm:px-5 py-5 sm:py-6 w-full">
      <h2 className="text-lg sm:text-xl font-orbitron text-emerald-300 mb-3 sm:mb-4">
        {title}
      </h2>
      <Table className="min-w-full">
        <TableCaption className="text-blue-600 font-poppins">
          {title} - Results
        </TableCaption>
        <TableHeader className="bg-violet-500/10">
          <TableRow>
            <TableHead className="text-blue-300 font-orbitron w-1/2 text-sm sm:text-base">
              Team Name
            </TableHead>
            <TableHead className="text-blue-300 font-orbitron w-1/2 text-sm sm:text-base">
              College
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result) => (
            <TableRow
              key={result.teamName}
              className="hover:bg-violet-500/10 transition-colors duration-200"
            >
              <TableCell className="font-poppins text-sm sm:text-base">
                {result.teamName}
              </TableCell>
              <TableCell className="font-poppins text-sm sm:text-base">
                {result.college}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-0 z-[10001] text-white/90 border-none w-[95vw] max-w-3xl sm:max-w-4xl lg:max-w-5xl bg-gradient-to-b from-violet-950/[0.2] via-violet-500/[0.1] via-60% border-l-2 border-violet-200/[0.1] backdrop-blur-md rounded-lg">
        <DialogHeader className="px-4 sm:px-6 pt-5 sm:pt-6 pb-3 sm:pb-4 border-b border-violet-200/20">
          <DialogTitle className="text-lg sm:text-2xl font-orbitron tracking-wider text-emerald-200 flex items-center gap-2 sm:gap-3">
            <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-300" />
            Round 1 Results
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center text-blue-300 mt-2">
          <span className="text-xs sm:text-sm bg-gradient-to-r from-blue-400 to-emerald-300 bg-clip-text text-transparent">
            Scroll
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-blue-300 ml-1 mt-1" />
        </div>

        <ScrollArea className="h-[calc(100dvh-12rem)] sm:h-[calc(100dvh-9rem)] w-full px-3 sm:px-4">
          {renderTable("Project Proposal", projectProposalResults)}
          {renderTable("Software Simulation", softwareSimulationResults)}
          {renderTable("Hardware Demo", hardwareDemoResults)}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ResultsDialog;
