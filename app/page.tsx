// app/page.tsx
'use client';

import React from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Members from "./components/Members";
import Footer from "./components/Footer";
import LoadingComponent from "./components/states/LoadingComponent";

export default function Home() {
  return (
    <LoadingComponent>
      <div className="flex flex-col min-h-screen bg-black">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <Features />
          <Members />
        </main>
        <Footer />
      </div>
    </LoadingComponent>
  );
}
