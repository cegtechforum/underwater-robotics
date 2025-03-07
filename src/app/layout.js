import { Orbitron, Poppins, Raleway } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';

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
  description:
    "Explore the future of underwater exploration and technology through the Underwater Robotics Challenge, a hallmark event of Kurukshetra 2025. This event brings together visionary minds to design, innovate, and engineer groundbreaking solutions for aquatic robotics. Join us to experience the perfect blend of technical brilliance, creativity, and futuristic thinking aimed at advancing marine technology and fostering innovation. Bought to you by CEG Tech Forum.",
  url: "https://underwaterrobotics.kurukshetraceg.org.in/",
  image: "https://underwaterrobotics.kurukshetraceg.org.in/banner.jpg",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${poppins.variable} ${raleway.variable}`}
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={metadata.image} />
        <meta property="og:url" content={metadata.url} />
        <meta property="og:site_name" content="Underwater Robotics" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={metadata.image} />
        <meta name="twitter:url" content={metadata.url} />
        <meta name="twitter:creator" content="@CEG_Tech_Forum" />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={metadata.url} />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
