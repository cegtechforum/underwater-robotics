import { Orbitron, Poppins, Raleway } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["400", "600", "700", "900"],
});

export const metadata = {
  title: "Underwater Robotics",
  description: "Explore the future of underwater exploration and technology through the Underwater Robotics Challenge, a hallmark event of Kurukshetra 2025. This event brings together visionary minds to design, innovate, and engineer groundbreaking solutions for aquatic robotics. Join us to experience the perfect blend of technical brilliance, creativity, and futuristic thinking aimed at advancing marine technology and fostering innovation. Bought to you by CEG Tech Forum.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${poppins.variable} ${raleway.variable}`}>
      <body>{children}</body>
    </html>
  );
}
