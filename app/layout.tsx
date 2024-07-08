import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React, { Suspense } from 'react';
import Loading from "./loading";
import { ThemeProvider } from 'next-themes'

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Delta Co Gaming",
  description: "Welcome to Delta Co Gaming! We host gaming events for everyone to enjoy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#b1a688]`}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
