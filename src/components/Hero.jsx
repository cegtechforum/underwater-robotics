import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import Image from "next/image";
import ResultsDialog from "./Dialog/Result";
import { Ship } from "lucide-react";

const Hero = () => {
  const [session, setSession] = useState(null);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData);
    };

    fetchSession();
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center px-4 l3:mt-0 mt-24 text-center">
      <div className="md:pt-8 sm:mt-20 md:mt-12">
        <Image
          src="/klogo.png"
          alt="Kurukshetra 2025"
          width={4500}
          height={1114}
          quality={100}
          priority
          className="w-auto h-24 mb-8"
        />
      </div>

      {/* CEG Tech Forum Button */}
      <Link
        href="https://cegtechforum.in/"
        target="_blank"
        rel="noopener"
        className="mb-6"
      >
        <motion.div
          className="relative px-6 py-2 rounded-lg overflow-hidden"
          style={{
            background:
              "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.6))",
            boxShadow: "0 0 20px rgba(0,0,0,0.5)",
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20"
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.span
            className="relative text-base font-bold tracking-wider text-transparent"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              WebkitTextStroke: "1px rgba(255,255,255,0.9)",
            }}
            animate={{
              textShadow: [
                "0 0 8px rgba(0,255,255,0.5)",
                "0 0 12px rgba(0,255,255,0.7)",
                "0 0 8px rgba(0,255,255,0.5)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            CEG TECH FORUM presents
          </motion.span>
          <motion.div
            className="absolute inset-x-0 bottom-0 h-[1px]"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(0,255,255,0.5), transparent)",
            }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </Link>

      {/* Rest of the component remains unchanged */}
      <motion.h1
        className="text-white m2:text-7xl m4:text-5xl text-4xl tracking-wide"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 900,
          background: "linear-gradient(45deg, #7fffd4, #ffffff)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
        initial={{ x: "-100%" }}
        animate={{ x: "0%" }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
          duration: 1.5,
        }}
      >
        Underwater <span className="text-orange-600">Robotics</span>
      </motion.h1>

      <motion.p
        className="mt-4 text-xl italic font-bold"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        style={{
          background:
            "linear-gradient(45deg, #22D3EE, #67E8F9, #A5F3FC, #38BDF8)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontFamily: "'Orbitron', sans-serif",
        }}
      >
        Dive into Innovation, Shape the Future Beneath the Waves
      </motion.p>

      <p
        className="mt-5 text-white text-lg tracking-wide capitalize"
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 500,
          fontSize: 18,
        }}
      >
        A National-Level Flagship Event in Underwater Technology
      </p>

      {/* Location Button */}
      <motion.a
        href="https://maps.app.goo.gl/JL1mG5KUfTrLS6Pg6"
        target="_blank"
        className="relative mx-auto sm:mx-0 mt-8 mb-2 px-4 py-1.5 font-poppins text-sm rounded-full bg-emerald-500/30 backdrop-blur-md overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
          animate={{
            x: ["-200%", "200%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <div className="relative flex items-center gap-1.5 text-emerald-200">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 384 512"
            height="8"
            width="8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path>
          </svg>
          <p className="tracking-wide text-sm">Anna University, Chennai</p>
        </div>
      </motion.a>

      <motion.button
        onClick={() => setIsResultsOpen(true)}
        className="mt-4 font-orbitron flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 
  bg-gradient-to-r from-cyan-900 to-teal-900 backdrop-blur-md lg:font-semibold isolation-auto 
  border-cyan-400 before:absolute before:w-full before:transition-all before:duration-700 
  before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full 
  before:bg-gradient-to-r before:from-cyan-400 before:to-teal-400 hover:text-black 
  before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 
  relative z-10 px-6 py-2 overflow-hidden border-2 rounded-full group"
        type="submit"
      >
        <motion.div
          animate={{
            y: [0, -4, 0],
            rotate: [-2, 2, -2],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Ship className="w-5 h-5" />
        </motion.div>
        View Results
      </motion.button>

      <div className="flex justify-center mt-7 mb-6">
        {!session || session.user.role !== "user" ? (
          <>
            <Link href="/signup" prefetch={true}>
              <button
                className="font-orbitron flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                type="submit"
              >
                Register
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 19"
                  className="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-orange-600 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
                >
                  <path
                    className="fill-gray-800 group-hover:fill-gray-800"
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  ></path>
                </svg>
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" prefetch={true}>
              <button
                className="font-orbitron flex justify-center gap-2 items-center mx-auto shadow-xl text-lg text-gray-50 bg-[#0A0D2D] backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-[#FFFFFF] hover:text-black before:-z-10 before:aspect-square before:hover:scale-200 before:hover:duration-500 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
                type="submit"
              >
                Dashboard
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 19"
                  className="w-8 h-8 justify-end bg-gray-50 group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-gray-700 p-2 rotate-45"
                >
                  <path
                    className="fill-gray-800 group-hover:fill-gray-800"
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                  ></path>
                </svg>
              </button>
            </Link>
          </>
        )}
      </div>
      <ResultsDialog open={isResultsOpen} onOpenChange={setIsResultsOpen} />
    </div>
  );
};

export default Hero;
