// app/components/Mods.tsx

/*
    TODO:
    - Make sure .html mods are downloadable / not viewable
    - Add a timer in the loading state of the download button
    - Remove the tooltip from the mod card and add a button to show the details
    - Add a button to copy the mod link to clipboard
    - Remove Last Updated
    - Add a before you go after the user press the visti link button to confirm they want to leave the site
*/

'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ExternalLink, Users, Copy, Search, Package, Info, Loader2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from 'axios';

interface Mod {
  id: string;
  name: string;
  url: string;
  downloadable: boolean;
  description: string;
  category: string;
  version: string;
  downloadCount?: number;
  lastUpdated?: string;
}

interface CommunityLink {
  id: string;
  name: string;
  url: string;
  description: string;
}

const ModsDownloadComponent = () => {
  const [mods, setMods] = useState<Mod[]>([]);
  const [communityLinks, setCommunityLinks] = useState<CommunityLink[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [copiedMod, setCopiedMod] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('mods');
  const [error, setError] = useState<string | null>(null);
  const [loadingMod, setLoadingMod] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/modder');
        setMods(response.data.mods);
        setCommunityLinks(response.data.communityLinks);
      } catch (error) {
        console.error('Error fetching mod data:', error);
        setError('Failed to load mod data. Please try again later.');
      }
    };
    fetchData();
  }, []);

  const filteredMods = mods.filter(mod => 
    mod.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === "All" || mod.category === selectedCategory)
  );

  const copyToClipboard = (text: string, modId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedMod(modId);
      setTimeout(() => setCopiedMod(null), 3000);
    }).catch(err => {
      console.error('Failed to copy:', err);
      setError('Failed to copy to clipboard. Please try again.');
    });
  };

  const handleDownload = async (mod: Mod) => {
    setLoadingMod(mod.id);
    await new Promise(resolve => setTimeout(resolve, 4000)); // 4 second delay
    setLoadingMod(null);
    window.open(mod.url, '_blank');
  };

  const renderModDetails = (mod: Mod) => (
    <ScrollArea className="h-[200px] w-[300px] rounded-md border p-4">
      <div className="text-sm py-1">
        <span className="font-semibold">Version:</span> {mod.version}
      </div>
      <div className="text-sm py-1">
        <span className="font-semibold">Category:</span> {mod.category}
      </div>
      {mod.downloadCount !== undefined && (
        <div className="text-sm py-1">
          <span className="font-semibold">Downloads:</span> {mod.downloadCount}
        </div>
      )}
      {mod.lastUpdated && (
        <div className="text-sm py-1">
          <span className="font-semibold">Last Updated:</span> {mod.lastUpdated}
        </div>
      )}
    </ScrollArea>
  );

  return (
    <div className="bg-black text-white py-12 pt-32 sm:pt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#b1a688] mb-8">Mod Downloads</h2>
        
        {error && (
          <Alert className="mb-4 bg-red-500 text-white">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search mods..."
              className="pl-8 bg-gray-900 border-[#b1a688] text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs defaultValue="All" className="w-full sm:w-auto" onValueChange={setSelectedCategory}>
            <TabsList className="bg-gray-900">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="Gameplay">Gameplay</TabsTrigger>
              <TabsTrigger value="Graphics">Graphics</TabsTrigger>
              <TabsTrigger value="Audio">Audio</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="bg-gray-900">
            <TabsTrigger value="mods">Mods</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === 'mods' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMods.map((mod) => (
              <Card key={mod.id} className="bg-gray-900 border-[#b1a688] overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-[#b1a688] flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="h-5 w-5 mr-2" />
                      {mod.name}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {renderModDetails(mod)}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {mod.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary" className="bg-[#b1a688] text-black">
                      {mod.category}
                    </Badge>
                    <span className="text-sm text-gray-400 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {mod.downloadCount || 0} downloads
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Last updated: {mod.lastUpdated || "Unknown"}
                  </p>
                </CardContent>
                <Separator className="bg-[#b1a688]" />
                <CardFooter className="pt-4">
                  {mod.url ? (
                    <Button 
                      className="w-full bg-[#b1a688] text-black hover:bg-[#9a8f73] flex justify-between items-center"
                      onClick={() => mod.downloadable ? handleDownload(mod) : copyToClipboard(mod.url, mod.id)}
                      disabled={loadingMod === mod.id}
                    >
                      {loadingMod === mod.id ? (
                        <>
                          <span>Downloading...</span>
                          <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          <span>{mod.downloadable ? 'Download' : 'View in Workshop'}</span>
                          {mod.downloadable ? <Download className="ml-2 h-4 w-4" /> : <ExternalLink className="ml-2 h-4 w-4" />}
                        </>
                      )}
                    </Button>
                  ) : (
                    <p className="text-sm text-gray-400 w-full text-center">No download available</p>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {activeTab === 'community' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityLinks.map((link) => (
              <Card key={link.id} className="bg-gray-900 border-[#b1a688] overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-[#b1a688]">{link.name}</CardTitle>
                  <CardDescription className="text-gray-400">{link.description}</CardDescription>
                </CardHeader>
                <CardFooter className="pt-4">
                  <Button 
                    className="w-full bg-[#b1a688] text-black hover:bg-[#9a8f73] flex justify-between items-center"
                    onClick={() => window.open(link.url, '_blank')}
                  >
                    <span>Visit Link</span>
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {filteredMods.length === 0 && activeTab === 'mods' && (
          <div className="text-center text-gray-500 mt-8">
            <Package className="h-12 w-12 mx-auto mb-4" />
            <p>No mods found matching your criteria.</p>
          </div>
        )}
      </div>
      
      {copiedMod && (
        <Alert className="fixed bottom-4 right-4 w-auto bg-green-500 text-white">
          <AlertDescription>
            Mod link copied to clipboard!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ModsDownloadComponent;