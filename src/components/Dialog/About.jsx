import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Anchor,
  ScrollText,
  Laptop2,
  Cpu,
  Mail,
  ExternalLink,
} from "lucide-react";

const AboutDialog = ({ Trigger, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Trigger />
      </DialogTrigger>
      <DialogContent className="p-0 z-[10001] text-white/80 border-none w-[95vw] max-w-5xl bg-gradient-to-b from-violet-950/[0.1] via-violet-500/[0.1] via-60% border-l-2 border-violet-200/[0.1] backdrop-blur-md">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-violet-200/20">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-orbitron tracking-wider text-emerald-200 flex items-center gap-2 sm:gap-3">
            <Anchor className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" />
            About the Challenge
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(100dvh-9rem)] w-full px-2 sm:px-4">
          <div className="my-3 sm:my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-4 sm:py-5 hover:border-blue-500/50 transition-colors duration-300">
            <h2 className="font-poppins tracking-wide text-blue-300/80 font-bold text-lg sm:text-xl flex items-center gap-2">
              <ScrollText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              Overview
            </h2>
            <div className="mt-3 text-base sm:text-lg font-poppins text-justify">
              <p className="pb-4 hover:text-blue-200 transition-colors duration-200">
                The Underwater Robotics Challenge, a cornerstone event of
                Kurukshetra 2025, invites innovative minds to explore the
                frontiers of aquatic technology. This unique competition
                provides a platform for participants to showcase their expertise
                in underwater robotics and exploration.
              </p>
            </div>
          </div>

          <div className="my-3 sm:my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-4 sm:py-5 hover:border-purple-500/50 transition-colors duration-300">
            <h2 className="font-poppins tracking-wide text-blue-300/80 font-bold text-lg sm:text-xl flex items-center gap-2">
              <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              Competition Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-4">
              {[
                {
                  title: "Documented Proposal",
                  icon: <ScrollText className="w-5 h-5 sm:w-6 sm:h-6" />,
                  description:
                    "Present your innovative concepts and detailed technical documentation",
                },
                {
                  title: "Software Simulation",
                  icon: <Laptop2 className="w-5 h-5 sm:w-6 sm:h-6" />,
                  description:
                    "Demonstrate your solution through advanced software simulations",
                },
                {
                  title: "Working Model",
                  icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6" />,
                  description:
                    "Showcase your functional prototype or working model",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="bg-black/40 p-4 sm:p-5 rounded-lg border border-gray-700/80 transform hover:scale-105 transition-transform hover:border-violet-500/30"
                >
                  <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex items-center gap-2 sm:gap-3 text-emerald-200">
                      {category.icon}
                      <h3 className="font-semibold tracking-wide text-sm sm:text-base">
                        {category.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-white/70">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="my-3 sm:my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-4 sm:py-5 hover:border-green-500/50 transition-colors duration-300">
            <h2 className="font-poppins tracking-wide text-blue-300/80 font-bold text-lg sm:text-xl flex items-center gap-2">
              <Laptop2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              Vision & Objectives
            </h2>
            <div className="mt-3 text-base sm:text-lg font-poppins text-justify">
              <p className="pb-4 hover:text-green-200 transition-colors duration-200">
                This challenge aims to inspire technical brilliance and foster
                futuristic thinking in the field of aquatic technology.
                Participants will have the opportunity to present their
                innovative solutions for underwater exploration and robotics,
                contributing to the advancement of marine technology.
              </p>
            </div>
          </div>

          <div className="my-6 sm:my-8 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 rounded-lg border-2 border-blue-500/30 px-3 sm:px-5 py-4 sm:py-5">
            <div className="text-center text-base sm:text-lg font-poppins">
              <span className="text-blue-300/90">
                &quot;Diving into innovation, engineering the future of
                underwater exploration.&quot;
              </span>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="border-t border-violet-200/20 px-4 sm:px-6 py-3 sm:py-4">
          <div className="w-full font-poppins flex justify-end items-center gap-4">
            <span className="text-xs sm:text-sm opacity-70 whitespace-nowrap">
              Need assistance?
            </span>
            <div className="flex items-center gap-4">
              {[{ email: "events@cegtechforum.in", label: "Events" }].map(
                (contact, index) => (
                  <a
                    key={index}
                    href={`mailto:${contact.email}`}
                    className="text-teal-400/80 hover:text-teal-300/90 transition-colors flex items-center gap-2 group text-xs sm:text-sm whitespace-nowrap"
                  >
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>{contact.email}</span>
                    <ExternalLink className="w-2 h-2 sm:w-3 sm:h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )
              )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AboutDialog;
