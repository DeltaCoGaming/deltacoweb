// app/components/Hero.tsx
// will make coords based on server members (that opt in)

'use client';

import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { motion } from 'framer-motion';
import { Gamepad, Server } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const DeltaCoHero = () => {
  const canvasRef = useRef();

  useEffect(() => {
    let phi = 0;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.694, 0.651, 0.533], // Converted #b1a688 to RGB
      glowColor: [0.694, 0.651, 0.533],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
        { location: [40.7128, -74.006], size: 0.1 },    // New York
        { location: [51.5074, -0.1278], size: 0.05 },   // London
        { location: [35.6762, 139.6503], size: 0.08 },  // Tokyo
        { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.003;
      }
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center p-4 pt-32 sm:pt-20 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 w-full max-w-6xl flex flex-col md:flex-row items-center justify-between"
      >
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-white">DELTA CO</span>
            <span className="text-[#b1a688]"> GAMING</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Your Global Gaming Haven
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-[#b1a688] hover:bg-[#ccc0a3] text-black px-6 py-4 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
              <Gamepad className="mr-2" /> Join Community
            </Button>
            <Button variant="outline" className="border-[#b1a688] text-[#b1a688] hover:bg-[#b1a688] hover:text-black px-6 py-4 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105">
              <Server className="mr-2" /> Explore Servers
            </Button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          <canvas
            ref={canvasRef}
            style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
          />
        </div>
      </motion.div>
      <Card className="mt-12 bg-gray-900 border-[#b1a688] max-w-2xl">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-[#b1a688] mb-4">Global Gaming Network</h2>
          <p className="text-gray-300">
            Join our worldwide community of gamers. With servers across multiple continents, 
            Delta Co Gaming offers low-latency gameplay and a diverse player base for an 
            unparalleled gaming experience.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DeltaCoHero;
