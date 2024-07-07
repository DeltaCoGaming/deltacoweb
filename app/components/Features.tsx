// app/components/Features.tsx

'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gamepad, Users, Server, Code, Headphones, Shield, LucideProps } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

gsap.registerPlugin(ScrollTrigger);

interface FeatureCardProps {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, index }) => {
  const controls = useAnimation();
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      { threshold: 0.1 }
    );

    if (card) {
      observer.observe(card);
    }

    return () => {
      if (card) {
        observer.unobserve(card);
      }
    };
  }, [controls]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: index * 0.2
      } 
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1, 
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay: 0.2 + index * 0.2 
      } 
    }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <Card className="bg-gray-900 border-[#b1a688] h-full overflow-hidden relative group">
        <CardHeader>
          <motion.div variants={iconVariants}>
            <Icon className="w-12 h-12 mb-4 text-[#b1a688] group-hover:text-white transition-colors duration-300" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-300 group-hover:text-white transition-colors duration-300">{description}</CardDescription>
        </CardContent>
        <motion.div 
          className="absolute inset-0 bg-[#b1a688] opacity-0 group-hover:opacity-10 transition-opacity duration-300"
          whileHover={{ scale: 1.05 }}
        />
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

const DeltaCoFeatures: React.FC = () => {
  const statsRef = useRef<HTMLDivElement | null>(null);

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
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 overflow-hidden">
      <h1 className="text-5xl md:text-7xl font-bold text-center mb-10 text-[#b1a688]">
        Delta Co Features
      </h1>

      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
        className="text-4xl md:text-6xl font-bold text-center mb-16 relative"
      >
        Experience the{" "}
        <span className="text-[#b1a688] relative">
          Delta Co
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-[#b1a688]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </span>{" "}
        Difference
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </div>

    </div>
  );
};

export default DeltaCoFeatures;
