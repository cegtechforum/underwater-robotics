import React, { useState, useEffect } from "react";
import { TbSubmarine } from "react-icons/tb";
// import { GoArrowUpRight } from "react-icons/go";
// import Link from "next/link";

const DayCountDown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const startDate = new Date("2025-01-11T20:00:00").getTime();
  const endDate = new Date("2025-02-05T23:59:00").getTime();
  const totalDuration = endDate - startDate;

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getProgressStyle = () => {
    const now = new Date().getTime();
    const elapsed = now - startDate;
    const progress = Math.min(
      Math.max((elapsed / totalDuration) * 100, 0),
      100
    );

    return {
      background: `conic-gradient(from 0deg at 50% 50%, rgb(234, 88, 12) ${progress}%, rgba(234, 88, 12, 0.2) ${progress}%)`,
    };
  };

  return (
    <div className="relative xl1:absolute xl1:bottom-10 xl1:right-10 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 backdrop-blur-sm border border-gray-500/30 l3:w-72 m2:w-2/4 w-3/4 rounded-2xl z-50 overflow-hidden shadow-xl animate-float border-dashed my-4">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 animate-wave1">
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-cyan-500/20 transform -skew-y-3" />
        </div>
        <div className="absolute inset-0 animate-wave2">
          <div className="absolute bottom-3 left-0 right-0 h-12 bg-cyan-400/20 transform skew-y-3" />
        </div>
        <div className="absolute inset-0 animate-wave3">
          <div className="absolute bottom-6 left-0 right-0 h-12 bg-cyan-300/20 transform -skew-y-3" />
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center py-3 px-4 h-full font-poppins">
        <div className="text-gray-200 flex items-center justify-center w-full gap-2">
          <div className="text-base font-medium">Join the event</div>
          <TbSubmarine className="text-2xl text-gray-200 animate-submarine" />
        </div>

        <div className="relative w-36 h-36 flex items-center justify-center my-3">
          <div
            className="absolute w-full h-full rounded-full animate-float"
            style={getProgressStyle()}
          />
          <div className="absolute w-[95%] h-[95%] rounded-full bg-gray-900/80 flex items-center justify-center animate-float">
            <div className="text-white font-poppins flex flex-col items-center">
              <span className="text-3xl font-bold text-orange-500 animate-float">
                {timeLeft.days}D
              </span>
              <div className="text-xs mt-2 space-x-2 text-gray-300">
                <span className="animate-float">
                  {String(timeLeft.hours).padStart(2, "0")}h:
                </span>
                <span className="animate-float">
                  {String(timeLeft.minutes).padStart(2, "0")}m:
                </span>
                <span className="animate-float">
                  {String(timeLeft.seconds).padStart(2, "0")}s
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-gray-200 text-xs flex items-center justify-center w-full">
          <div className="font-medium">Counting down to the end of the Round 1</div>
          {/* <Link
            href="/signup"
            className="block ml-auto p-2 rounded-full text-white text-lg bg-black cursor-pointer font-bold border-2 border-gray-500 hover:rotate-45 hover:bg-orange-600 duration-300"
          >
            <GoArrowUpRight />
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default DayCountDown;
