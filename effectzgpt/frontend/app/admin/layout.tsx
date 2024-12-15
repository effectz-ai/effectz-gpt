"use client"

import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeContext } from "@/context";
import { QueryClient, QueryClientProvider } from "react-query";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeContext>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </ThemeContext>
      </body>
    </html>
  );
}
