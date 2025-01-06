import React from "react";
import { Copyright } from "lucide-react";

const Footer = ({ variant = "default" }) => {
  const currentYear = new Date().getFullYear();

  const styles = {
    default: {
      wrapper:
        "w-full bg-gray-50 text-gray-800 py-4 sm:py-6 border-t border-gray-200",
      container: "container mx-auto px-4 sm:px-6 lg:px-8",
      content:
        "flex flex-row items-center justify-center gap-x-2 text-sm sm:text-base",
      link: "ml-1 text-blue-600 hover:text-blue-700 transition-colors duration-200",
    },
    dark: {
      wrapper:
        "z-40 text-gray-400 bg-black font-orbitron tracking-widest text-xs sm:text-sm pb-4 sm:pb-5",
      container: "container mx-auto px-4 sm:px-6 lg:px-8",
      content:
        "flex flex-row items-center justify-center gap-x-4",
      link: "underline underline-offset-4",
    },
  };

  const selectedStyle = styles[variant === "dark" ? "dark" : "default"];

  return (
    <footer className={selectedStyle.wrapper}>
      <div className={selectedStyle.container}>
        <div className={selectedStyle.content}>
          <Copyright className="w-4 h-4" />
          <span>{currentYear}</span>
          <span>
            Designed & Developed by{" "}
            <a
              href="https://cegtechforum.in"
              className={selectedStyle.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              CEG Tech Forum
            </a>
            .
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;