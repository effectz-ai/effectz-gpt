import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ThemeContext } from "@/context";
import { QueryClient, QueryClientProvider } from "react-query";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EffectzGPT",
  description: "Your Trusted AI Partner",
};

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
