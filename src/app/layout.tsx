import type { Metadata } from "next";
import { Geist_Mono, Space_Grotesk } from "next/font/google";
import { ThemeProvider, LangProvider } from "@/lib/context";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Erlangga Pradana Kurniawan | Engineering Lab",
  description:
    "Personal digital engineering laboratory — Erlangga Pradana Kurniawan, electrical engineering student and creative technologist based in Yogyakarta, Indonesia.",
  keywords: ["Erlangga Pradana Kurniawan", "portfolio", "electrical engineering", "frontend", "IoT", "embedded systems", "Yogyakarta"],
  authors: [{ name: "Erlangga Pradana Kurniawan" }],
  openGraph: {
    title: "Erlangga Pradana Kurniawan | Engineering Lab",
    description: "Personal digital engineering laboratory — frontend, embedded systems, IoT, and visual experiments.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erlangga Pradana Kurniawan | Engineering Lab",
    description: "Personal digital engineering laboratory.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <LangProvider>
            {children}
          </LangProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
