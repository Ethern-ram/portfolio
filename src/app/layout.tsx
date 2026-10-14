import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/context/PortfolioContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#080c14" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-two-theta-zzdg5z2s6v.vercel.app"),
  title: "Erlangga Pradana Kurniawan | Erlangga Lab — Engineering Portfolio",
  description:
    "Personal engineering portfolio of Erlangga Pradana Kurniawan, Electrical Engineering undergraduate at Institut Teknologi Nasional Yogyakarta (ITNY). Focused on autonomous UAV systems, Cube Orange+ flight control, NVIDIA Jetson companion computing, and computer vision.",
  keywords: [
    "Erlangga Pradana Kurniawan",
    "Erlangga Lab",
    "ITNY",
    "Institut Teknologi Nasional Yogyakarta",
    "Electrical Engineering",
    "Autonomous UAV",
    "VTOL QuadPlane",
    "Cube Orange+",
    "ArduPilot",
    "MAVLink",
    "Jetson Nano",
    "OpenCV",
    "ArUco Marker",
    "Embedded Systems",
    "Yogyakarta",
  ],
  authors: [{ name: "Erlangga Pradana Kurniawan" }],
  openGraph: {
    title: "Erlangga Pradana Kurniawan | Erlangga Lab",
    description:
      "Engineering portfolio of Erlangga Pradana Kurniawan — Autonomous UAVs, companion computing, and computer vision.",
    url: "https://portfolio-two-theta-zzdg5z2s6v.vercel.app/",
    siteName: "Erlangga Lab",
    images: [
      {
        url: "/gambarku.jpeg",
        width: 800,
        height: 1000,
        alt: "Erlangga Pradana Kurniawan",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erlangga Pradana Kurniawan | Erlangga Lab",
    description:
      "Engineering portfolio — Autonomous UAVs, Cube Orange+ avionics, Jetson Nano perception, and embedded systems.",
    images: ["/gambarku.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans bg-[var(--bg-page)] text-[var(--text-primary)]">
        <PortfolioProvider>
          {children}
        </PortfolioProvider>
      </body>
    </html>
  );
}
