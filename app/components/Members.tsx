'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users } from 'lucide-react';

type Member = {
  id: string;
  name: string;
  avatar: string;
  status: string;
};

const MembersWidget = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/members');
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await response.json();
      console.log('Fetched members:', data);
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      setError('Failed to load members. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchMembers();
    }
  }, [isOpen, fetchMembers]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="fixed bottom-4 right-4 bg-[#b1a688] text-black hover:bg-[#9a8f73]"
        >
          <Users className="mr-2 h-4 w-4" />
          View Members
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-black text-white border-[#b1a688]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#b1a688]">Server Members</DialogTitle>
          <DialogDescription className="text-gray-400">
            Currently active members in the server.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-4 h-[60vh] pr-4">
          {isLoading ? (
            <p className="text-center">Loading members...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : members.length > 0 ? (
            <div className="space-y-4">
              {members.map((member) => (
                <Card key={member.id} className="bg-gray-900 border-[#b1a688] hover:bg-gray-800 transition-colors duration-200">
                  <CardContent className="p-4 flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-[#b1a688] text-black">{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="font-medium text-[#b1a688]">{member.name}</p>
                      <Badge variant="outline" className={`${getStatusColor(member.status)} text-white`}>
                        {member.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center">No members found</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default MembersWidget;