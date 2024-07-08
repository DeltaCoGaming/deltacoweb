// app/components/community/Support.tsx

'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Paperclip } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const supportItems = [
  { icon: Mail, title: "Email Support", description: "Send us an email at support@deltaco.com and we'll get back to you as soon as possible." },
  { icon: MessageSquare, title: "Discord Support", description: "Get real-time support through our Discord channel. Fill out the form below to send a message." }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const DeltaCoSupport: React.FC = () => {
  const [formData, setFormData] = useState({
    discordName: '',
    discordId: '',
    supportType: '',
    urgency: '',
    description: '',
    receiveDm: false,
    attachment: null as File | null
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const formDataToSend = {
      discordName: formData.discordName,
      discordId: formData.discordId,
      supportType: formData.supportType,
      urgency: formData.urgency,
      description: formData.description,
      receiveDm: formData.receiveDm,
    };
  
    try {
      const response = await axios.post('/api/discord/support', formDataToSend);
  
      if (response.status === 200) {
        setIsSubmitted(true);
      } else {
        console.error('Failed to submit the support request. BO');
      }
    } catch (error) {
      console.error('Error submitting the support request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 overflow-hidden">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-center mb-10 text-white"
          variants={itemVariants}
        >
          Support Center
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-6xl font-bold text-center mb-16 relative"
        >
          How Can We Assist You?
          <motion.span
            className="absolute -bottom-2 left-0 w-full h-1 bg-[#b1a688]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
        >
          {supportItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-black border-white/10 h-full overflow-hidden relative group hover:bg-white/5 transition-all duration-300">
                <CardHeader>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="w-12 h-12 mb-4 text-white group-hover:text-[#b1a688] transition-colors duration-300" />
                  </motion.div>
                  <CardTitle className="text-2xl font-bold text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 group-hover:text-white transition-colors duration-300">{item.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <Tabs defaultValue="discord" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-700">
            <TabsTrigger value="discord" className="data-[state=active]:bg-white/5 data-[state=active]:text-white">Discord Support</TabsTrigger>
            <TabsTrigger value="email" className="data-[state=active]:bg-white/5 data-[state=active]:text-white">Email Support</TabsTrigger>
          </TabsList>
          <TabsContent value="discord">
            <Card className="mt-6 bg-gray-700 border-[#b1a688]">
              <CardHeader>
                <CardTitle className="text-[#b1a688]">Discord Support Form</CardTitle>
                <CardDescription className="text-gray-400">Fill out this form to get support through our Discord channel.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="discordName" className="text-[#b1a688]">Discord Name</Label>
                      <Input id="discordName" name="discordName" placeholder="Your Discord username" onChange={handleInputChange} className="bg-white/5 text-white border-[#b1a688]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discordId" className="text-[#b1a688]">Discord ID</Label>
                      <Input id="discordId" name="discordId" placeholder="Your Discord ID" onChange={handleInputChange} className="bg-white/5 text-white border-[#b1a688]" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="supportType" className="text-[#b1a688]">Support Type</Label>
                      <Select name="supportType" onValueChange={(value) => setFormData(prev => ({ ...prev, supportType: value }))}>
                        <SelectTrigger className="bg-white/5 text-white border-[#b1a688]">
                          <SelectValue placeholder="Select support type" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 text-[#b1a688]">
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing Support</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="urgency" className="text-[#b1a688]">Urgency</Label>
                      <Select name="urgency" onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                        <SelectTrigger className="bg-white/5 text-white border-[#b1a688]">
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent className="bg-black text-white">
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-[#b1a688]">Description</Label>
                    <Textarea id="description" name="description" placeholder="Describe your issue..." onChange={handleInputChange} className="bg-white/5 text-[#b1a688] border-[#b1a688]" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="receiveDm" name="receiveDm" onCheckedChange={(checked) => setFormData(prev => ({ ...prev, receiveDm: checked as boolean }))} />
                    <Label htmlFor="receiveDm" className="text-[#b1a688]">Receive DM from support</Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachment" className="text-[#b1a688]">Attachment</Label>
                    <Input id="attachment" name="attachment" type="file" onChange={(e) => setFormData(prev => ({ ...prev, attachment: e.target.files?.[0] || null }))} className="bg-white/5 text-[#b1a688] border-[#b1a688]" />
                  </div>
                  <Button type="submit" className="w-full bg-[#b1a688] text-black hover:bg-[#a09578]">
                    <Send className="mr-2 h-4 w-4" /> Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="email">
            <Card className="mt-6 bg-gray-700 border-[#b1a688]">
              <CardHeader>
                <CardTitle className="text-white">Email Support</CardTitle>
                <CardDescription className="text-gray-400">Send an email to our support team for assistance.</CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="bg-white/5 border-white/10">
                  <Mail className="h-4 w-4 text-white" />
                  <AlertTitle className="text-white">Contact Information</AlertTitle>
                  <AlertDescription className="text-gray-400">
                    Please send your support request to <a href="mailto:support@deltaco.com" className="underline text-[#b1a688]">support@deltaco.com</a>. We will get back to you as soon as possible.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <Alert variant="default" className="bg-[#b1a688] text-black">
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your support request has been submitted. We will get back to you soon.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DeltaCoSupport;



/*

    TODO: 

    - Clear form after submission
    - Add loading state
    - Add error state

    FIX: Image not sending with embed 

    - Make embed better

*/