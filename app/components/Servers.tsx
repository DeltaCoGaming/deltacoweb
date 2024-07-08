'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gamepad2, Users, Copy, Search, Server, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from 'axios';

interface ServerDetails {
  map?: string;
  mission?: string;
  type?: string;
  mods?: string[];
  [key: string]: any;
}

interface ServerAttributes {
  id: string;
  name: string;
  players: number;
  maxPlayers: number;
  status: string;
  ip?: string;
  port?: number;
  details: ServerDetails;
  [key: string]: any;
}

interface Server {
  attributes: ServerAttributes;
}

const GameServers = () => {
  const [servers, setServers] = useState<Server[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [copiedServer, setCopiedServer] = useState<string | null>(null);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await axios.get('/api/battlemets/servers');
        setServers(response.data.map((server: { data: any; }) => server.data));
      } catch (error) {
        console.error('Error fetching server data:', error);
      }
    };
    fetchServers();
  }, []);

  const filteredServers = servers?.filter(server => 
    server.attributes &&
    server.attributes.name &&
    server.attributes.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedType === "All" || server.attributes.details?.type === selectedType)
  ) || [];

  const copyToClipboard = (text: string, serverId: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedServer(serverId);
      setTimeout(() => setCopiedServer(null), 3000);
    });
  };

  const renderServerDetails = (details: ServerDetails) => (
    <ScrollArea className="h-[200px] w-[300px] rounded-md border p-4">
      {Object.entries(details).map(([key, value]) => {
        if (typeof value === 'object') return null;
        return (
          <div key={key} className="text-sm py-1">
            <span className="font-semibold">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
          </div>
        );
      })}
    </ScrollArea>
  );

  return (
    <div className="bg-black text-white py-12 pt-32 sm:pt-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-[#b1a688] mb-8">Our Game Servers</h2>
        
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Search servers..."
              className="pl-8 bg-gray-900 border-[#b1a688] text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Tabs defaultValue="All" className="w-full sm:w-auto" onValueChange={setSelectedType}>
            <TabsList className="bg-gray-900">
              <TabsTrigger value="All">All</TabsTrigger>
              <TabsTrigger value="PvE">PvE</TabsTrigger>
              <TabsTrigger value="PvP">PvP</TabsTrigger>
              <TabsTrigger value="Survival">Survival</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServers.map((server) => {
            const { id, name, players, status, details, maxPlayers, ip, port } = server.attributes;
            const fillPercentage = maxPlayers > 0 ? (players / maxPlayers) * 100 : 0;

            return (
              <Card key={id} className="bg-gray-900 border-[#b1a688] overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-[#b1a688] flex items-center justify-between">
                    <div className="flex items-center">
                      <Gamepad2 className="h-5 w-5 mr-2" />
                      {name}
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          {renderServerDetails(details)}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {details.mission && `Mission: ${details.mission}`}
                    {details.map && <><br />Map: {details.map}</>}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary" className={
                      status === "online" ? "bg-green-500" : "bg-yellow-500"
                    }>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                    <span className="text-sm text-gray-400 flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {`${players}/${maxPlayers}`}
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#b1a688]"
                      style={{ width: `${fillPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0</span>
                    <span>{maxPlayers}</span>
                  </div>
                </CardContent>
                <Separator className="bg-[#b1a688]" />
                <CardFooter className="pt-4">
                  <Button 
                    className="w-full bg-[#b1a688] text-black hover:bg-[#9a8f73] flex justify-between items-center"
                    onClick={() => copyToClipboard(`${ip}:${port}`, id)}
                  >
                    <span>{ip}:{port}</span>
                    <Copy className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {filteredServers.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Server className="h-12 w-12 mx-auto mb-4" />
            <p>No servers found matching your criteria.</p>
          </div>
        )}
      </div>
      
      {copiedServer && (
        <Alert className="fixed bottom-4 right-4 w-auto bg-green-500 text-white">
          <AlertDescription>
            Server IP copied to clipboard!
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default GameServers;