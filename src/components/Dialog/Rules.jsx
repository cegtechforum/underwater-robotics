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
  Waves,
  Award,
  Target,
  Shield,
  AlertCircle,
  Mail,
  ExternalLink,
} from "lucide-react";

const RulesDialog = ({ Trigger, open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Trigger />
      </DialogTrigger>
      <DialogContent className="p-0 z-[10001] text-white/80 border-none w-[95vw] max-w-5xl bg-gradient-to-b from-violet-950/[0.1] via-violet-500/[0.1] via-60% border-l-2 border-violet-200/[0.1] backdrop-blur-md">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-violet-200/20">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-orbitron tracking-wider text-emerald-200 flex items-center gap-2 sm:gap-3">
            <Award className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" />
            Competition Guidelines
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(100dvh-9rem)] w-full px-2 sm:px-4">
          <div className="my-3 sm:my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-4 sm:py-5 hover:border-blue-500/50 transition-colors duration-300">
            <h2 className="font-poppins tracking-wide text-blue-300/80 font-bold text-lg sm:text-xl flex items-center gap-2">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              Eligibility & Team Formation
            </h2>
            <ol className="mt-3 text-base sm:text-lg font-poppins list-decimal ml-4 sm:ml-8 text-justify">
              <li className="pb-2 hover:text-blue-200 transition-colors duration-200">
                The competition extends a warm welcome to innovative minds from
                all departments, fostering cross-disciplinary collaboration and
                diverse perspectives.
              </li>
              <li className="pb-2 hover:text-blue-200 transition-colors duration-200">
                Form dynamic teams of up to 4 members, creating the perfect
                balance for collaborative innovation and efficient project
                execution.
              </li>
              <li className="pb-2 hover:text-blue-200 transition-colors duration-200">
                Each participant&apos;s unique expertise should be focused on
                one team throughout the competition journey.
              </li>
            </ol>
          </div>

          <div className="my-3 sm:my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-4 sm:py-5 hover:border-purple-500/50 transition-colors duration-300">
            <h2 className="font-poppins tracking-wide text-blue-300/80 font-bold text-lg sm:text-xl flex items-center gap-2">
              <Waves className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              Round 1: Abstract Submission
            </h2>
            <ol className="mt-3 text-base sm:text-lg font-poppins list-decimal ml-4 sm:ml-8 text-justify">
              <li className="pb-2 hover:text-purple-200 transition-colors duration-200">
                Craft a compelling abstract in PDF format that encompasses:
                <ul className="list-disc ml-4 sm:ml-8 mt-2 text-sm sm:text-base">
                  <li>
                    An innovative problem statement that challenges conventional
                    thinking
                  </li>
                  <li>A groundbreaking approach and methodology</li>
                  <li>Anticipated outcomes and their transformative impact</li>
                  <li>Precise articulation within 500-700 words</li>
                </ul>
              </li>
              <li className="pb-2 hover:text-purple-200 transition-colors duration-200">
                Submit your vision through the official portal before the
                deadline, marking the first step in your journey to innovation.
              </li>
            </ol>
          </div>

          <div className="my-3 sm:my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-4 sm:py-5 hover:border-green-500/50 transition-colors duration-300">
            <h2 className="font-poppins tracking-wide text-blue-300/80 font-bold text-lg sm:text-xl flex items-center gap-2">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-400" />
              Round 2: Final Presentation
            </h2>
            <ol className="mt-3 text-base sm:text-lg font-poppins list-decimal ml-4 sm:ml-8 text-justify">
              <li className="pb-2 hover:text-green-200 transition-colors duration-200">
                Showcase your innovation in a dynamic 10-15 minute presentation,
                followed by an engaging discussion with our expert panel.
              </li>
              <li className="pb-2 hover:text-green-200 transition-colors duration-200">
                Bring your vision to life through cutting-edge simulation tools
                or working prototypes for an immersive demonstration.
              </li>
              <li className="pb-2 hover:text-green-200 transition-colors duration-200">
                Ensure your underwater innovations prioritize safety without
                compromising on creativity.
              </li>
            </ol>
          </div>

          <div className="my-3 sm:my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-4 sm:py-5 hover:border-amber-500/50 transition-colors duration-300">
            <h2 className="font-poppins tracking-wide text-blue-300/80 font-bold text-lg sm:text-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              Critical Guidelines
            </h2>
            <ol className="mt-3 text-base sm:text-lg font-poppins list-decimal ml-4 sm:ml-8 text-justify">
              <li className="pb-2 hover:text-amber-200 transition-colors duration-200">
                Focus your expertise in a single category to maximize your
                impact and innovation potential.
              </li>
              <li className="pb-2 hover:text-amber-200 transition-colors duration-200">
                Maintain the highest standards of academic integrity; any form
                of plagiarism will lead to immediate disqualification.
              </li>
              <li className="pb-2 hover:text-amber-200 transition-colors duration-200">
                Pioneer underwater innovations with unwavering commitment to
                safety protocols and guidelines.
              </li>
              <li className="pb-2 hover:text-amber-200 transition-colors duration-200">
                Trust in the expertise of our distinguished judging panel, whose
                decisions will shape the future of underwater innovation.
              </li>
            </ol>
          </div>

          <div className="my-6 sm:my-8 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 rounded-lg border-2 border-blue-500/30 px-3 sm:px-5 py-4 sm:py-5">
            <div className="text-base sm:text-lg font-poppins text-justify">
              <span className="text-blue-300/90">
                &quot;Innovation meets safety in every wave of progress. Your
                creativity today shapes the underwater technology of
                tomorrow.&quot;
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
              {[{ email: "underwaterrobotics@cegtechforum.in", label: "Events" }].map(
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

export default RulesDialog;
