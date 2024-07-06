// app/components/Navbar.tsx

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Gamepad2, Users, Server, Coffee, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  const MobileNav = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-black border-r border-[#b1a688]">
        <nav className="flex flex-col h-full">
          <div className="flex justify-between items-center py-4 px-4 border-b border-[#b1a688]">
            <h2 className="text-2xl font-bold text-white">Menu</h2>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6 text-white" />
            </Button>
          </div>
          <div className="flex-grow overflow-y-auto">
            {menuItems.map((item, index) => (
              <div key={index} className="py-2">
                <Button
                  variant="ghost"
                  className="w-full justify-between text-lg font-medium text-white hover:bg-[#b1a688] hover:text-black"
                  onClick={() => item.subItems && setIsOpen(false)}
                >
                  <span className="flex items-center">
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </span>
                  {item.subItems && <ChevronRight className="h-5 w-5" />}
                </Button>
                {item.subItems && (
                  <div className="ml-6 mt-2 space-y-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <Button
                        key={subIndex}
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-[#b1a688] hover:text-black"
                        onClick={() => setIsOpen(false)}
                      >
                        {subItem}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-auto p-4 border-t border-[#b1a688]">
            <Button className="w-full bg-[#b1a688] hover:bg-[#9e9377] text-black font-bold" onClick={() => setIsOpen(false)}>
              Join Discord
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

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
          <MobileNav />
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