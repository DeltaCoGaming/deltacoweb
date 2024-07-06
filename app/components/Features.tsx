// app/components/Features.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad, Users, Server, Code, Headphones, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ icon: Icon, title, description, delay }: { icon: React.ElementType, title: string, description: string, delay: number }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    gsap.fromTo(card, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1,
        scrollTrigger: {
          trigger: card,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gray-900 border-[#b1a688] h-full">
        <CardHeader>
          <Icon className="w-12 h-12 mb-4 text-[#b1a688]" />
          <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300">{description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const features = [
  { icon: Gamepad, title: "Custom Game Modes", description: "Experience unique gameplay with our exclusive mods and game modes." },
  { icon: Users, title: "Vibrant Community", description: "Join thousands of gamers in our active Discord and forum discussions." },
  { icon: Server, title: "Global Servers", description: "Enjoy low-latency gameplay with our worldwide server network." },
  { icon: Code, title: "Mod Support", description: "Create and share your own mods with our developer-friendly tools." },
  { icon: Headphones, title: "24/7 Support", description: "Get help anytime with our round-the-clock customer support team." },
  { icon: Shield, title: "Fair Play", description: "Play in a safe environment with our advanced anti-cheat systems." }
];

const DeltaCoFeatures = () => {
  const statsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        textContent: 0,
        duration: 2,
        ease: "power1.inOut",
        snap: { textContent: 1 },
        stagger: 0.25,
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-6xl font-bold text-center mb-16"
      >
        Experience the <span className="text-[#b1a688]">Delta Co</span> Difference
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} delay={index * 0.2} />
        ))}
      </div>
    </div>
  );
};

export default DeltaCoFeatures;
