import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Github, Gamepad, Gamepad2, Code, Bot, Heart } from 'lucide-react';

const DeltaCoGamingFooter = () => {
  return (
    <footer className="bg-black text-white border-t border-[#b1a688] py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#b1a688]">Delta Co Gaming</h3>
            <p className="text-sm text-gray-300">A laid-back Discord community for gamers who enjoy playing together without the pressure of competition.</p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Gamepad className="h-5 w-5 text-[#b1a688]" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5 text-[#b1a688]" />
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#b1a688]">What Were About</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <Gamepad2 className="h-4 w-4 mr-2 text-[#b1a688]" />
                Casual gaming sessions
              </li>
              <li className="flex items-center">
                <Heart className="h-4 w-4 mr-2 text-[#b1a688]" />
                Building friendships
              </li>
              <li className="flex items-center">
                <Code className="h-4 w-4 mr-2 text-[#b1a688]" />
                Sharing gaming tips
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#b1a688]">Lead Dev Spotlight</h3>
            <p className="text-sm text-gray-300">Our lead developer is passionate about enhancing gaming experiences through modding.</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center">
                <Code className="h-4 w-4 mr-2 text-[#b1a688]" />
                Arma 3 modding
              </li>
              <li className="flex items-center">
                <Bot className="h-4 w-4 mr-2 text-[#b1a688]" />
                AI integration in games
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8 bg-[#b1a688]" />
        <div className="text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Delta Co Gaming. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default DeltaCoGamingFooter;