// app/components/Navbar.tsx


'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Gamepad2, Users, Server, Coffee, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  { 
    name: 'Games', 
    icon: Gamepad2, 
    subItems: ['ARAM3', 'Project Zomboid', 'DayZ'] 
  },
  { 
    name: 'Community', 
    icon: Users, 
    subItems: ['Support', 'Questions', 'Forum', 'Mods'] 
  },
  { name: 'Servers', icon: Server },
  { name: 'Events', icon: Coffee },
];

const NavLink = ({ item }: { item: any }) => {
  if (item.subItems) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            className="relative group px-4 py-2 text-lg font-medium text-white hover:text-[#b1a688] transition-colors duration-200 flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            {item.name}
            <ChevronDown className="ml-1 h-4 w-4" />
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-black border border-[#b1a688]">
          {item.subItems.map((subItem: string, index: number) => (
            <DropdownMenuItem key={index} className="text-white hover:bg-[#b1a688] hover:text-black">
              <a href={`/${item.name.toLowerCase()}/${subItem.toLowerCase().replace(' ', '-')}`}>
                {subItem}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <motion.a
      href={`/${item.name.toLowerCase().replace(' ', '-')}`}
      className="relative group px-4 py-2 text-lg font-medium text-white hover:text-[#b1a688] transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
    >
      <span className="relative z-10">{item.name}</span>
      <motion.div
        className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-10 transition-opacity duration-200"
        layoutId="highlight"
      />
    </motion.a>
  );
};

const DesktopNav = () => (
  <nav className="hidden lg:flex space-x-4">
    {menuItems.map((item, index) => (
      <NavLink key={index} item={item} />
    ))}
  </nav>
);

const MobileNav = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  const menuVariants = {
    closed: { opacity: 0, x: "-100%" },
    open: { opacity: 1, x: 0 }
  };

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full sm:w-[400px] p-0 bg-black border-r border-[#b1a688]">
        <motion.nav
          className="flex flex-col h-full"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex justify-between items-center py-4 px-4 border-b border-[#b1a688]">
            <motion.h2
              className="text-2xl font-bold text-white"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Menu
            </motion.h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>
          <motion.div className="flex-grow overflow-y-auto py-4">
            <Accordion type="single" collapsible className="w-full">
              <AnimatePresence>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    variants={itemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.subItems ? (
                      <AccordionItem value={item.name} className="border-b border-[#b1a688]">
                        <AccordionTrigger className="py-4 px-4 text-white hover:text-[#b1a688]">
                          <span className="flex items-center">
                            <item.icon className="mr-2 h-5 w-5" />
                            {item.name}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <motion.div className="ml-6 space-y-2">
                            {item.subItems.map((subItem, subIndex) => (
                              <motion.a
                                key={subItem}
                                href={`/${item.name.toLowerCase()}/${subItem.toLowerCase().replace(' ', '-')}`}
                                className="block py-2 px-4 text-white hover:bg-[#b1a688] hover:text-black rounded-md transition-colors duration-200"
                                onClick={() => setIsOpen(false)}
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                              >
                                {subItem}
                              </motion.a>
                            ))}
                          </motion.div>
                        </AccordionContent>
                      </AccordionItem>
                    ) : (
                      <motion.a
                        href={`/${item.name.toLowerCase().replace(' ', '-')}`}
                        className="flex items-center py-4 px-4 text-white hover:bg-[#b1a688] hover:text-black transition-colors duration-200"
                        onClick={() => setIsOpen(false)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <item.icon className="mr-2 h-5 w-5" />
                        {item.name}
                      </motion.a>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </Accordion>
          </motion.div>
          <motion.div
            className="mt-auto p-4 border-t border-[#b1a688]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              className="w-full bg-[#b1a688] hover:bg-[#9e9377] text-black font-bold"
              onClick={() => setIsOpen(false)}
            >
              Join Discord
            </Button>
          </motion.div>
        </motion.nav>
      </SheetContent>
    </Sheet>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full z-50 bg-black bg-opacity-90 backdrop-blur-md"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-8 w-8 text-[#b1a688]" />
            <a href="/" className="text-2xl font-bold text-white">
              Delta Co <span className="text-[#b1a688]">Gaming</span>
            </a>
          </div>
          <DesktopNav />
          <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="hidden lg:block">
            <Button className="bg-[#b1a688] hover:bg-[#9e9377] text-black font-bold">
              Join Discord
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default NavBar;