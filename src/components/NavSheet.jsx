"use client";

import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { HiMenuAlt3 } from "react-icons/hi";
import Image from "next/image";
import AboutDialog from "./Dialog/About";
import RulesDialog from "./Dialog/Rules";
import PrizeDialog from "./Dialog/Prize";
import ContactDialog from "./Dialog/Contact";

const NavSheet = () => {
  const [session, setSession] = useState(null);
  const [dialogs, setDialogs] = useState({
    about: false,
    rules: false,
    prize: false,
    contact: false,
  });

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  const handleDialogToggle = (dialogKey, isOpen) => {
    setDialogs((prevState) => ({
      ...prevState,
      [dialogKey]: isOpen,
    }));
  };

  return (
    <>
      <Sheet className="l2:hidden flex justify-center items-center">
        <SheetTrigger className="absolute top-0 sm:top-3 right-0 bg-white p-2 text-xl rounded-full m4:mx-5 mx-2 m2:my-1 m4:my-2 mr-3 block l2:hidden">
          <HiMenuAlt3 className="h-6 w-6" />
        </SheetTrigger>
        <SheetContent side="left" className="text-white bg-black/90">
          <SheetHeader>
            <SheetTitle className="mb-8 ml-9">
              <Image
                src="/ctf_logo.png"
                alt="CTF Logo"
                width={195}
                height={195}
                priority
                quality={100}
              />
            </SheetTitle>
            <SheetDescription className="mt-16">
              <div>
                <div className="font-orbitron">
                  <a
                    onClick={() => handleDialogToggle("about", true)}
                    className="text-white text-4xl border-b border-gray-600 flex items-center justify-center pb-4 hover:text-orange-600 duration-200 mb-7"
                  >
                    <div className="text-gray-200">About</div>
                    <div className="ml-auto">
                      <GoArrowUpRight />
                    </div>
                  </a>
                  <a
                    onClick={() => handleDialogToggle("rules", true)}
                    className="text-white text-4xl border-b border-gray-600 flex items-center justify-center pb-4 hover:text-orange-600 duration-200 mb-7"
                  >
                    <div className="text-gray-200">Rules</div>
                    <div className="ml-auto">
                      <GoArrowUpRight />
                    </div>
                  </a>
                  <a
                    onClick={() => handleDialogToggle("prize", true)}
                    className="text-white text-4xl border-b border-gray-600 flex items-center justify-center pb-4 hover:text-orange-600 duration-200 mb-7"
                  >
                    <div className="text-gray-200">Prize</div>
                    <div className="ml-auto">
                      <GoArrowUpRight />
                    </div>
                  </a>
                  <a
                    onClick={() => handleDialogToggle("contact", true)}
                    className="text-white text-4xl border-b border-gray-600 flex items-center justify-center pb-4 hover:text-orange-600 duration-200 mb-7"
                  >
                    <div className="text-gray-200">Contact</div>
                    <div className="ml-auto">
                      <GoArrowUpRight />
                    </div>
                  </a>

                  {!session || session.user.role !== "user" ? (
                    <div className="flex items-center justify-between">
                      <div>
                        <Link href="/signup">
                          <button
                            className="font-orbitron flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                            type="submit"
                          >
                            Register
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 19"
                              className="w-8 h-8 justify-end bg-orange-600 group-hover:rotate-90 group-hover:bg-orange-600 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
                            >
                              <path
                                className="fill-gray-800 group-hover:fill-gray-800"
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                              ></path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                      <div>
                        <Link href="/login">
                          <button
                            className="font-orbitron flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                            type="submit"
                          >
                            Login
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 16 19"
                              className="w-8 h-8 justify-end bg-green-500 group-hover:rotate-90 group-hover:bg-green-500 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
                            >
                              <path
                                className="fill-gray-800 group-hover:fill-gray-800"
                                d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                              ></path>
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center text-white">
                      <p className="text-lg">Welcome, {session.user?.name}!</p>
                    </div>
                  )}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      {/* Dialog Components */}
      <AboutDialog
        open={dialogs.about}
        onOpenChange={(isOpen) => handleDialogToggle("about", isOpen)}
        Trigger={() => null}
      />
      <RulesDialog
        open={dialogs.rules}
        onOpenChange={(isOpen) => handleDialogToggle("rules", isOpen)}
        Trigger={() => null}
      />
      <PrizeDialog
        open={dialogs.prize}
        onOpenChange={(isOpen) => handleDialogToggle("prize", isOpen)}
        Trigger={() => null}
      />
      <ContactDialog
        open={dialogs.contact}
        onOpenChange={(isOpen) => handleDialogToggle("contact", isOpen)}
        Trigger={() => null}
      />
    </>
  );
};

export default NavSheet;
