'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, parseISO, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Users, Trophy, Tag, Gamepad } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "@/components/ui/toaster";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Simulated data and functions (replace with actual API calls in a real application)
const fetchEvents = () => {
  // Simulated API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
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
          description: "Create the most impressive castle in 2 hours!",
          date: "2024-07-20T20:00:00Z",
          participants: [{ id: 3, name: "Player3" }],
          maxParticipants: 50,
          prize: "Custom Discord Role",
          tags: ["creative", "building", "timed"],
          hostAvatar: "/path/to/another-avatar.jpg",
          hostName: "BlockWizard"
        },
        // Add more events as needed
      ]);
    }, 1000);
  });
};

const signUpForEvent = (eventId, userData) => {
  // Simulated API call
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
    <Card className="w-full bg-gradient-to-br from-purple-900 to-indigo-900 text-white shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-extrabold">{event.title}</CardTitle>
        <CardDescription className="text-lg text-purple-200">{event.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5 text-purple-300" />
            <span>{format(parseISO(event.date), 'PPP')}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-purple-300" />
            <span>{format(parseISO(event.date), 'p')}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Users className="h-5 w-5 text-purple-300" />
            <span>{event.participants.length} / {event.maxParticipants}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="font-bold text-yellow-400">{event.prize}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {event.tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-700 text-white">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={event.hostAvatar} alt={event.hostName} />
            <AvatarFallback>{event.hostName.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span>Hosted by {event.hostName}</span>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-purple-600 hover:bg-purple-700">
              Join Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
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
                <Button type="submit">Sign Up</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

const EventCalendar = ({ events, onSelectDate, selectedDate }) => {
  return (
    <Calendar
      mode="single"
      selected={selectedDate}
      onSelect={onSelectDate}
      className="rounded-md border shadow"
      components={{
        day: ({ day, date }) => {
          const eventsOnDay = events.filter(event => isSameDay(parseISO(event.date), date));
          return (
            <div className="relative">
              <Button
                variant="ghost"
                className={`w-9 h-9 p-0 font-normal ${
                  eventsOnDay.length > 0 ? 'bg-purple-100 hover:bg-purple-200' : ''
                }`}
              >
                <time dateTime={date.toISOString()}>{day}</time>
              </Button>
              {eventsOnDay.length > 0 && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-1 h-1 bg-purple-500 rounded-full" />
                </div>
              )}
            </div>
          );
        },
      }}
    />
  );
};

const EventList = ({ events, onSignUp }) => (
  <ScrollArea className="h-[calc(100vh-200px)] w-full rounded-md border p-4">
    <div className="space-y-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} onSignUp={onSignUp} />
      ))}
    </div>
  </ScrollArea>
);

const EventsDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState("calendar");

  useEffect(() => {
    fetchEvents().then(setEvents);
  }, []);

  const filteredEvents = selectedDate
    ? events.filter(event => isSameDay(parseISO(event.date), selectedDate))
    : events;

  const handleSignUp = async (eventId, userData) => {
    const result = await signUpForEvent(eventId, userData);
    if (result.success) {
      // Update the local state to reflect the sign-up
      setEvents(events.map(event => 
        event.id === eventId
          ? { ...event, participants: [...event.participants, { id: userData.steamId, name: userData.username }] }
          : event
      ));
    }
    return result;
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <h1 className="text-4xl font-bold text-center mb-8">Gaming Events Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        <TabsContent value="calendar" className="mt-4">
          <div className="flex space-x-8">
            <div className="w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>Event Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <EventCalendar 
                    events={events} 
                    onSelectDate={setSelectedDate} 
                    selectedDate={selectedDate}
                  />
                </CardContent>
              </Card>
            </div>
            <div className="w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {selectedDate ? `Events on ${format(selectedDate, 'PPP')}` : "All Upcoming Events"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EventList events={filteredEvents} onSignUp={handleSignUp} />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <EventList events={events} onSignUp={handleSignUp} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
};

export default EventsDashboard;