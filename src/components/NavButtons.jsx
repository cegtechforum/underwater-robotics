/* eslint-disable */

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";
import NavSheet from "./NavSheet";

const NavButtons = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
      // console.log(sessionData);
    };

    fetchSession();
  }, []);

  return (
    <div className="h-16 w-auto l2:bg-black bg-transparent absolute top-6 z-50 m2:right-5 right-3 rounded-es-2xl bottomCard border-b-2 border-l-2 l2:border-gray-700 border-transparent p-4 py-9">
      <div className="l2:flex h-full px-4 hidden">
        <div className="flex items-center space-x-8 font-orbitron">
          {!session || session.user.role !=="user" ? (
            <div className="flex items-center">
              <Link
                href="/login"
                className="text-white hover:text-orange-600 duration-200 mr-8"
              >
                Login
              </Link>
              <Link href="/signup">
                <button
                  className="font-orbitron flex items-center gap-2 text-sm text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-1 overflow-hidden border-2 rounded-full group"
                  type="submit"
                >
                  Register
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 19"
                    className="w-7 h-7 bg-gray-50 group-hover:rotate-90 group-hover:bg-orange-600 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
                  >
                    <path
                      className="fill-gray-800 group-hover:fill-gray-800"
                      d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          ) : (
            <p className="text-white">Hola, {session.user?.name}!</p>
          )}
        </div>
      </div>
      <NavSheet />
    </div>
  );
};

export default NavButtons;