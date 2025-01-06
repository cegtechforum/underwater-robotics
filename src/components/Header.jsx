/* eslint-disable */

import React, { useState } from "react";
import Image from "next/image";
import AboutDialog from "./Dialog/About";
import RulesDialog from "./Dialog/Rules";
import PrizeDialog from "./Dialog/Prize";
import ContactDialog from "./Dialog/Contact";

const Header = () => {
  const [dialogs, setDialogs] = useState({
    about: false,
    rules: false,
    prize: false,
    contact: false,
  });

  const handleDialogToggle = (dialogKey, isOpen) => {
    setDialogs((prevState) => ({
      ...prevState,
      [dialogKey]: isOpen,
    }));
  };

  return (
    <>
      <div className="absolute top-0 left-0 m1:p-5 p-2 z-20 cursor-pointer flex items-center justify-center m1:w-full w-max m1:pr-80 pr-0">
        <div className="mr-auto">
          <div className="overflow-hidden m1:h-12 m3:h-16 m4:h-14 h-12 w-auto">
            <Image
              src="/ctf_logo.png"
              alt="CTF Logo"
              width={195}
              height={195}
              priority
              quality={100}
            />
          </div>
        </div>
        <div className="ml-auto font-orbitron -mt-5 l2:block hidden">
          <a
            onClick={() => handleDialogToggle("about", true)}
            className="l1:mx-5 mx-3 group"
          >
            <span className="text-gray-300 group-hover:text-orange-600 duration-200">
              //
            </span>
            <span className="text-white ml-1">About</span>
          </a>
          <a
            onClick={() => handleDialogToggle("rules", true)}
            className="l1:mx-5 mx-3 group"
          >
            <span className="text-gray-300 group-hover:text-orange-600 duration-200">
              //
            </span>
            <span className="text-white ml-1">Rules</span>
          </a>
          <a
            onClick={() => handleDialogToggle("prize", true)}
            className="l1:mx-5 mx-3 group"
          >
            <span className="text-gray-300 group-hover:text-orange-600 duration-200">
              //
            </span>
            <span className="text-white ml-1">Prize</span>
          </a>
          <a
            onClick={() => handleDialogToggle("contact", true)}
            className="l1:mx-5 mx-3 group"
          >
            <span className="text-gray-300 group-hover:text-orange-600 duration-200">
              //
            </span>
            <span className="text-white ml-1">Contact</span>
          </a>
        </div>
      </div>

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

export default Header;
