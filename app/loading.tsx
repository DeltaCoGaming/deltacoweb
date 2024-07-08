'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Crosshair, Shield, Zap, Target, Radio } from 'lucide-react';

const LoadingPage = () => {
  const [loadingText, setLoadingText] = useState('INITIATING SEQUENCE');
  const controls = useAnimation();

  useEffect(() => {
    const texts = [
      'INITIATING SEQUENCE',
      'LOADING ARSENAL',
      'ESTABLISHING COMMS',
      'SCANNING HOSTILES',
      'ACTIVATING DEFENSES',
      'READY FOR COMBAT'
    ];
    let index = 0;
    const interval = setInterval(() => {
      setLoadingText(texts[index]);
      controls.start({ scale: [1, 1.2, 1], transition: { duration: 0.3 } });
      index = (index + 1) % texts.length;
    }, 2000);
    return () => clearInterval(interval);
  }, [controls]);

  const iconVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-black overflow-hidden relative perspective-1000">
      {/* 3D rotating background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={{ rotateY: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: 'radial-gradient(circle, rgba(34,193,195,0.3) 0%, rgba(45,253,107,0.3) 100%)',
          boxShadow: 'inset 0 0 100px rgba(0,255,0,0.5)',
        }}
      />

      {/* Radar sweep effect */}
      <div className="absolute inset-0 z-10">
        <motion.div
          className="w-full h-full border-2 border-green-500 rounded-full absolute"
          style={{ borderRadius: '50%' }}
          animate={{
            scale: [0, 2],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        className="text-center z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Rotating icons */}
        <motion.div
          className="relative w-40 h-40 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {[Crosshair, Shield, Zap, Target, Radio].map((Icon, index) => (
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center"
              style={{ rotate: `${index * 72}deg` }}
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.2 }}
            >
              <Icon className="w-12 h-12 text-green-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Title with glitch effect */}
        <motion.h1
          className="text-6xl font-bold text-green-500 mb-4 relative"
          animate={{ textShadow: ["0 0 7px #22c1c3", "0 0 10px #22c1c3", "0 0 21px #22c1c3", "0 0 42px #22c1c3", "0 0 82px #22c1c3", "0 0 92px #22c1c3", "0 0 102px #22c1c3", "0 0 151px #22c1c3"] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        >
          DELTA CO
          <motion.span
            className="absolute top-0 left-0 w-full"
            animate={{
              clipPath: [
                "inset(0 0 0 0)",
                "inset(100% 0 0 0)",
                "inset(0 0 0 0)",
                "inset(0 0 100% 0)",
                "inset(0 0 0 0)"
              ]
            }}
            transition={{ duration: 1, repeat: Infinity, repeatType: "loop", times: [0, 0.02, 0.05, 0.07, 1] }}
          >
            DELTA CO
          </motion.span>
        </motion.h1>

        {/* Loading text */}
        <motion.div
          className="text-2xl text-green-300 mb-4 font-mono"
          animate={controls}
        >
          {loadingText}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-80 h-3 bg-green-900 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </motion.div>

        {/* Flickering text */}
        <motion.p
          className="mt-4 text-green-400 font-mono"
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 0.2, repeat: Infinity }}
        >
          STAND BY FOR ORDERS
        </motion.p>
      </motion.div>

      {/* Floating particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-green-500 rounded-full z-30"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, Math.random() * 100 - 50],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      ))}
    </div>
  );
};

export default LoadingPage;