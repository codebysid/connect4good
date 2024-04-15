import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import XHeader from "@/components/XHeader";
import UserProvider from "@/context/UserProvider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connect4Good",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <UserProvider>
          <XHeader />
          <Toaster />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
