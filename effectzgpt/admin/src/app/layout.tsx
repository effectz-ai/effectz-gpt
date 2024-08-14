import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeContext } from "@/context";
import { NavBar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EffectzGPT",
  description: "Your Trusted AI Partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContext>
          <NavBar />
          {children}
        </ThemeContext>
      </body>
    </html>
  );
}
