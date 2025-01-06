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
  Trophy,
  Gift,
  Star,
  Sparkles,
  Medal,
  Crown,
  Timer,
  Mail,
  ExternalLink,
} from "lucide-react";

const PrizeDialog = ({ Trigger, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="text-white">
      <DialogTrigger asChild>
        <Trigger />
      </DialogTrigger>
      <DialogContent className="p-0 z-[10001] text-white/80 border-none max-w-5xl bg-gradient-to-b from-violet-950/[0.1] via-violet-500/[0.1] via-60% border-l-2 border-violet-200/[0.1] backdrop-blur-md">
        <DialogHeader className="px-6 pt-4 sm:pt-6 pb-4 border-b border-violet-200/20">
          <DialogTitle className="text-xl font-orbitron tracking-wider sm:text-2xl md:text-3xl text-emerald-200 flex items-center gap-3">
            <Trophy className="w-8 h-8 text-emerald-300" />
            Prize Pool
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(100dvh-9rem)] w-full px-4">
          <div className="my-8 text-center">
            <div className="relative inline-block">
              <Crown className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400/80 animate-pulse mx-auto mb-4" />
            </div>
          </div>

          <div className="my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-6 sm:py-8 hover:border-yellow-500/50 transition-colors duration-300">
            <div className="text-center space-y-4 sm:space-y-6">
              <h2 className="font-poppins tracking-wide text-yellow-300/90 font-bold text-xl sm:text-2xl md:text-3xl flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
                Exciting Prize Pool Coming Soon!
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8" />
              </h2>

              <div className="flex justify-center gap-3 sm:gap-4 my-6 sm:my-8">
                {[...Array(3)].map((_, i) => (
                  <Medal
                    key={i}
                    className={`w-8 h-8 sm:w-12 sm:h-12 ${
                      i === 0
                        ? "text-yellow-400"
                        : i === 1
                        ? "text-gray-300"
                        : "text-amber-600"
                    } animate-bounce`}
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 my-6 sm:my-8">
            {[
              {
                icon: <Gift className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Cash Prizes",
                description: "Substantial rewards awaiting winners",
              },
              {
                icon: <Star className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Certificates",
                description: "Recognition of excellence",
              },
              {
                icon: <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />,
                title: "Special Awards",
                description: "Exclusive prizes for innovations",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-black/40 p-4 sm:p-6 rounded-lg border border-gray-700/80 transform hover:scale-105 transition-transform hover:border-violet-500/30"
              >
                <div className="flex flex-col items-center text-center gap-2 sm:gap-3">
                  <div className="text-yellow-400/80">{item.icon}</div>
                  <h3 className="font-semibold tracking-wide text-emerald-200">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="my-6 sm:my-8 bg-gradient-to-r from-yellow-900/20 via-amber-900/20 to-yellow-900/20 rounded-lg border-2 border-yellow-500/30 px-3 sm:px-5 py-6 sm:py-8">
            <div className="text-center space-y-3 sm:space-y-4">
              <div className="flex items-center justify-center gap-2 text-yellow-300/80">
                <Timer className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
                <span className="font-semibold text-sm sm:text-base">
                  Stay Tuned!
                </span>
              </div>
              <p className="text-base sm:text-lg font-poppins">
                Prize details will be announced shortly. Get ready for an
                exciting reward package that celebrates innovation and
                excellence!
              </p>
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

export default PrizeDialog;
