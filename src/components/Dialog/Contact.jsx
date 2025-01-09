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
  Mail,
  MessageCircle,
  HelpCircle,
  Send,
  Wrench,
  ExternalLink,
  Phone,
  User,
} from "lucide-react";

const ContactDialog = ({ Trigger, open, onOpenChange }) => {
  const contacts = [
    { name: "HARSHA VARDHAN A D", number: "+91 73395 39995" },
    { name: "SANGAMITHRA M", number: "+91 63826 57615" },
    { name: "VISHNU N", number: "+91 95009 32702" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className="text-white">
      <DialogTrigger asChild>
        <Trigger />
      </DialogTrigger>
      <DialogContent className="p-0 z-[10001] text-white/80 border-none max-w-5xl bg-gradient-to-b from-violet-950/[0.1] via-violet-500/[0.1] via-60% border-l-2 border-violet-200/[0.1] backdrop-blur-md">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 border-b border-violet-200/20">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-orbitron tracking-wider text-emerald-200 flex items-center gap-2 sm:gap-3">
            <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-300" />
            Get in Touch
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[calc(100dvh-9rem)] w-full px-3 sm:px-4">
          <div className="my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-4 sm:py-5 hover:border-blue-500/50 transition-colors duration-300">
            <h2 className="font-poppins tracking-wide text-blue-300/80 font-bold text-lg sm:text-xl flex items-center gap-2">
              <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
              We&#39;re Here to Help
            </h2>
            <div className="mt-3 text-base sm:text-lg font-poppins text-justify">
              <p className="pb-4 hover:text-blue-200 transition-colors duration-200">
                Have questions about the Underwater Robotics Challenge? Our
                dedicated team is ready to assist you. Reach out to us through
                email or contact our team members directly.
              </p>
            </div>
          </div>

          <div className="bg-black/80 rounded-lg border-2 border-gray-700/80 p-4 sm:p-6 hover:border-amber-500/50 transition-all duration-300 group mb-4">
            <div className="relative">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <User className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-poppins text-lg sm:text-xl font-bold text-amber-300/90">
                  Mentor
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-amber-100/90 font-semibold text-base sm:text-lg">
                  Dr R Venkatesan
                </p>
                <p className="text-amber-200/70 text-sm sm:text-base">
                  Professor of Practice Anna University & 
                  Adj Prof University of Massachusetts Dartmouth USA
                </p>
                <a
                  href="tel:+91 94443 99829"
                  className="flex items-center gap-2 text-amber-400/80 hover:text-amber-300 transition-colors mt-2 text-sm sm:text-base"
                >
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>+91 94443 99829</span>
                </a>
              </div>
            </div>
          </div>

          <div className="bg-black/80 rounded-lg border-2 border-gray-700/80 p-4 sm:p-6 hover:border-purple-500/50 transition-all duration-300 group">
            <div className="relative">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 group-hover:scale-110 transition-transform" />
                <h3 className="font-poppins text-lg sm:text-xl font-bold text-purple-300/90">
                  Contact Information
                </h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="mailto:events@cegtechforum.in"
                  className="flex items-center gap-1 text-teal-400/80 hover:text-teal-300 transition-colors group/link text-sm sm:text-base"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>events@cegtechforum.in</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>
                <a
                  href="mailto:underwaterrobotics@cegtechforum.in"
                  className="flex items-center text-teal-400/80 hover:text-teal-300 transition-colors group/link text-sm sm:text-base"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>&nbsp;underwaterrobotics@cegtechforum.in</span>
                  <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                </a>

                <div className="mt-4">
                  <table className="w-auto">
                    <tbody>
                      {contacts.map((contact, index) => (
                        <tr key={index} className="text-white/70">
                          <td className="py-2 pr-4 flex items-center">
                            <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400/80 mr-2" />
                            <a
                              href={`tel:${contact.number}`}
                              className="text-teal-400 hover:text-teal-300"
                            >
                              {contact.name}
                            </a>
                          </td>
                          <td className="py-2">|</td>
                          <td className="py-2 pl-4">{contact.number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="my-4 bg-black/80 rounded-lg border-2 border-gray-700/80 px-3 sm:px-5 py-4 sm:py-5">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                <span className="text-sm sm:text-base text-violet-300">
                  Quick Response
                </span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-gray-700"></div>
              <div className="flex items-center gap-2">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-violet-400" />
                <span className="text-sm sm:text-base text-violet-300">
                  24/7 Support
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className="border-t border-violet-200/20 px-4 sm:px-6 py-3 sm:py-4">
          <div className="w-full text-center">
            <span className="text-xs sm:text-sm opacity-70">
              We aim to respond to all queries within 24 hours
            </span>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;