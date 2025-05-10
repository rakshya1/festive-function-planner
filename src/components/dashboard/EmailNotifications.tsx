
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailService } from "@/services/EmailService";
import { Mail, CalendarCheck, Bell } from "lucide-react";

interface Recipient {
  name: string;
  email: string;
  eventId: string;
  eventTitle: string;
}

const EmailNotifications = () => {
  const [emailAddress, setEmailAddress] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // Sample recipients for testing notifications
  const sampleRecipients: Recipient[] = [
    { name: "John Doe", email: "john@example.com", eventId: "1", eventTitle: "Tech Conference 2025" },
    { name: "Jane Smith", email: "jane@example.com", eventId: "2", eventTitle: "Music Festival Weekend" },
    { name: "Bob Johnson", email: "bob@example.com", eventId: "3", eventTitle: "Startup Networking Mixer" },
  ];
  
  const handleSendRegistrationEmail = async () => {
    if (!emailAddress) return;
    
    setIsSending(true);
    try {
      await EmailService.sendRegistrationConfirmation(
        emailAddress,
        "Tech Conference 2025",
        "June 15, 2025 at 9:00 AM",
        "San Francisco Convention Center"
      );
    } finally {
      setIsSending(false);
    }
  };
  
  const handleSendReminder = async () => {
    if (!emailAddress) return;
    
    setIsSending(true);
    try {
      await EmailService.sendEventReminder(
        emailAddress,
        "Tech Conference 2025",
        "June 15, 2025 at 9:00 AM",
        "San Francisco Convention Center"
      );
    } finally {
      setIsSending(false);
    }
  };
  
  const handleSendUpdate = async () => {
    if (!emailAddress) return;
    
    setIsSending(true);
    try {
      await EmailService.sendEventUpdate(
        emailAddress,
        "Tech Conference 2025",
        "The venue has been changed to Downtown Innovation Center. The time remains the same."
      );
    } finally {
      setIsSending(false);
    }
  };
  
  const handleSendBulkReminders = async () => {
    setIsSending(true);
    try {
      // Simulate sending multiple emails
      for (const recipient of sampleRecipients) {
        await EmailService.sendEventReminder(
          recipient.email,
          recipient.eventTitle,
          "Tomorrow",
          "Event venue"
        );
        // Small delay between emails
        await new Promise(resolve => setTimeout(resolve, 300));
      }
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Notifications
        </CardTitle>
        <CardDescription>
          Send registration confirmations, reminders, and updates to event attendees
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="single">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single Email</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Emails</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Recipient Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="attendee@example.com"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2">
              <Button
                variant="outline" 
                onClick={handleSendRegistrationEmail} 
                disabled={!emailAddress || isSending}
                className="flex items-center gap-2"
              >
                <Mail className="h-4 w-4" />
                Registration
              </Button>
              <Button
                variant="outline"
                onClick={handleSendReminder}
                disabled={!emailAddress || isSending}
                className="flex items-center gap-2"
              >
                <Bell className="h-4 w-4" />
                Reminder
              </Button>
              <Button
                variant="outline"
                onClick={handleSendUpdate}
                disabled={!emailAddress || isSending}
                className="flex items-center gap-2"
              >
                <CalendarCheck className="h-4 w-4" />
                Update
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="bulk">
            <div className="space-y-4">
              <div className="border rounded-md p-3">
                <h4 className="font-medium mb-2">Attendees with upcoming events</h4>
                <div className="space-y-2">
                  {sampleRecipients.map((recipient) => (
                    <div key={recipient.email} className="flex items-center justify-between text-sm">
                      <span>{recipient.name} ({recipient.email})</span>
                      <span className="text-muted-foreground">{recipient.eventTitle}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={handleSendBulkReminders} 
                disabled={isSending}
                className="w-full"
              >
                {isSending ? "Sending..." : "Send Reminders to All"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EmailNotifications;
