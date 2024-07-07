'use client';

import React, { useState, useEffect } from 'react';
import { format, parseISO, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { CalendarIcon, Clock, Users, Trophy, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast, Toaster } from "@/components/ui/toaster";

const fetchEvents = () => {
  // Simulated API call with more events
  return Promise.resolve([
    {
      id: 1,
      title: "Fortnite Tournament",
      description: "Battle Royale showdown with exclusive skins for top performers!",
      date: "2024-07-15T18:00:00Z",
      participants: [{ id: 1, name: "Player1" }, { id: 2, name: "Player2" }],
      maxParticipants: 100,
      prize: "$500 Steam Gift Card",
      tags: ["competitive", "battle-royale", "prizes"],
      hostAvatar: "/path/to/host-avatar.jpg",
      hostName: "GameMaster42"
    },
    {
      id: 2,
      title: "Minecraft Build Challenge",
      description: "Show off your creativity in this epic build battle!",
      date: "2024-07-20T15:00:00Z",
      participants: [{ id: 3, name: "Builder1" }],
      maxParticipants: 50,
      prize: "Exclusive in-game items",
      tags: ["creative", "building", "multiplayer"],
      hostAvatar: "/path/to/host-avatar2.jpg",
      hostName: "BlockMaster"
    },
    // Add more events as needed
  ]);
};

const signUpForEvent = (eventId, userData) => {
  console.log(`User ${userData.username} (Steam64 ID: ${userData.steamId}) signed up for event ${eventId}`);
  return Promise.resolve({ success: true });
};

const EventCard = ({ event, onSignUp }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSignUp = async (userData) => {
    const result = await onSignUp(event.id, userData);
    if (result.success) {
      setIsDialogOpen(false);
      toast({
        title: "Successfully signed up!",
        description: `You've been registered for ${event.title}.`,
      });
    }
  };

  return (
    <Card className="w-full bg-white text-black shadow-xl border-2 border-[#b1a688] mb-4">
      <CardHeader className="bg-[#b1a688] text-white">
        <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm mb-2">{event.description}</p>
        <div className="grid grid-cols-2 gap-2 mb-2 text-sm">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-[#b1a688]" />
            <span>{format(parseISO(event.date), 'PPP')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-[#b1a688]" />
            <span>{format(parseISO(event.date), 'p')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-[#b1a688]" />
            <span>{event.participants.length} / {event.maxParticipants}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-[#b1a688]" />
            <span className="font-bold">{event.prize}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {event.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs border-[#b1a688] text-[#b1a688]">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={event.hostAvatar} alt={event.hostName} />
              <AvatarFallback>{event.hostName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-xs">Hosted by {event.hostName}</span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#b1a688] hover:bg-[#9a8f73] text-white">
                Join
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white text-black">
              <DialogHeader>
                <DialogTitle>Sign Up for {event.title}</DialogTitle>
                <DialogDescription>
                  Enter your details to join this exciting event!
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSignUp({
                  username: formData.get('username'),
                  steamId: formData.get('steamId')
                });
              }}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input id="username" name="username" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="steamId" className="text-right">
                      Steam64 ID
                    </Label>
                    <Input id="steamId" name="steamId" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="bg-[#b1a688] hover:bg-[#9a8f73] text-white">Sign Up</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

const CustomCalendar = ({ events, selectedDate, setSelectedDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const startOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const days = daysInMonth(currentMonth);
  const startDay = startOfMonth(currentMonth);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <Button onClick={prevMonth} variant="outline" size="icon">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <Button onClick={nextMonth} variant="outline" size="icon">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
        {Array.from({ length: startDay }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: days }).map((_, index) => {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), index + 1);
          const isSelected = isSameDay(date, selectedDate);
          const hasEvents = events.some(event => isSameDay(parseISO(event.date), date));
          return (
            <Button
              key={index}
              variant="ghost"
              className={`h-8 w-8 p-0 ${isSelected ? 'bg-[#b1a688] text-white' : ''} ${
                hasEvents ? 'text-[#b1a688] font-bold' : ''
              }`}
              onClick={() => setSelectedDate(date)}
            >
              {index + 1}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

const EventsDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const handleSignUp = async (eventId, userData) => {
    const result = await signUpForEvent(eventId, userData);
    if (result.success) {
      setEvents(events.map(event => 
        event.id === eventId
          ? { ...event, participants: [...event.participants, { id: userData.steamId, name: userData.username }] }
          : event
      ));
    }
    return result;
  };

  const filteredEvents = events.filter(event => 
    isSameDay(parseISO(event.date), selectedDate)
  );

  const upcomingEvents = events
    .filter(event => parseISO(event.date) >= new Date())
    .sort((a, b) => parseISO(a.date) - parseISO(b.date))
    .slice(0, 5);

  return (
    <div className="p-8 bg-black min-h-screen pt-32 sm:pt-20">
      <h1 className="text-4xl font-bold text-center mb-8 text-[#b1a688]">Gaming Events Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="col-span-1 bg-white">
          <CardHeader>
            <CardTitle className="text-[#b1a688]">Event Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomCalendar
              events={events}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <div className="mt-6 text-center">
              <img
                src="/try.png"
                alt="Gaming event illustration"
                className="mx-auto rounded-lg shadow-md"
              />
              <p className="mt-4 text-sm text-gray-600">
                Join exciting gaming events and compete with players from around the world!
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div className="col-span-1 lg:col-span-2">
          <Tabs defaultValue="selected" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="selected">Selected Date</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            </TabsList>
            <TabsContent value="selected">
              <h2 className="text-2xl font-semibold text-[#b1a688] mb-4">
                Events on {format(selectedDate, 'MMMM d, yyyy')}
              </h2>
              <ScrollArea className="h-[calc(100vh-300px)]">
                {filteredEvents.length > 0 ? (
                  filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} onSignUp={handleSignUp} />
                  ))
                ) : (
                  <Card className="bg-white text-black p-6">
                    <p className="text-center text-gray-500">No events scheduled for this date.</p>
                  </Card>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="upcoming">
              <h2 className="text-2xl font-semibold text-[#b1a688] mb-4">
                Upcoming Events
              </h2>
              <ScrollArea className="h-[calc(100vh-300px)]">
                {upcomingEvents.map(event => (
                  <EventCard key={event.id} event={event} onSignUp={handleSignUp} />
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default EventsDashboard;