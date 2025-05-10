
import React from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  PlusCircle, 
  Ticket, 
  Users, 
  BarChart3, 
  Settings, 
  Edit, 
  Trash
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Sample data for the dashboard
const myEvents = [
  {
    id: "101",
    title: "Product Launch Workshop",
    date: "2025-06-20",
    time: "2:00 PM - 5:00 PM",
    location: "Online (Zoom)",
    status: "Upcoming",
    attendees: 45,
    ticketsSold: 45,
    revenue: 1350
  },
  {
    id: "102",
    title: "Marketing Strategy Seminar",
    date: "2025-07-15",
    time: "10:00 AM - 12:00 PM",
    location: "Business Center",
    status: "Upcoming",
    attendees: 28,
    ticketsSold: 28,
    revenue: 980
  },
  {
    id: "103",
    title: "Networking Happy Hour",
    date: "2025-05-10",
    time: "6:00 PM - 8:00 PM",
    location: "Downtown Lounge",
    status: "Past",
    attendees: 60,
    ticketsSold: 60,
    revenue: 900
  }
];

const registeredEvents = [
  {
    id: "201",
    title: "Tech Conference 2025",
    date: "2025-06-15",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    ticketType: "General Admission"
  },
  {
    id: "202",
    title: "Startup Networking Mixer",
    date: "2025-06-05",
    time: "6:30 PM - 9:00 PM",
    location: "Downtown Innovation Hub",
    ticketType: "VIP Access"
  }
];

const Dashboard = () => {
  const upcomingEvents = myEvents.filter(event => event.status === "Upcoming");
  const pastEvents = myEvents.filter(event => event.status === "Past");
  
  // Calculate summary stats
  const totalEvents = myEvents.length;
  const totalAttendees = myEvents.reduce((acc, event) => acc + event.attendees, 0);
  const totalRevenue = myEvents.reduce((acc, event) => acc + event.revenue, 0);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <Button asChild className="gradient-bg w-full md:w-auto">
            <Link to="/create-event" className="flex items-center gap-1">
              <PlusCircle className="h-4 w-4 mr-1" />
              <span>Create New Event</span>
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-event-primary mr-2" />
                <span className="text-2xl font-bold">{totalEvents}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Attendees
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-event-primary mr-2" />
                <span className="text-2xl font-bold">{totalAttendees}</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Total Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-event-primary mr-2" />
                <span className="text-2xl font-bold">${totalRevenue}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="my-events" className="mb-8">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="registered">Registered Events</TabsTrigger>
          </TabsList>
          
          <TabsContent value="my-events">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Events You're Organizing</h2>
              </div>
              
              <Tabs defaultValue="upcoming">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming" className="pt-6">
                  {upcomingEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        You don't have any upcoming events
                      </p>
                      <Button asChild variant="outline">
                        <Link to="/create-event">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Create your first event
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                  {event.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {new Date(event.date).toLocaleDateString()} • {event.time}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {event.location}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/event/${event.id}`}>
                                  View
                                </Link>
                              </Button>
                              <Button variant="outline" size="sm" className="text-blue-500 hover:text-blue-600">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Attendees
                              </div>
                              <div className="font-semibold">{event.attendees}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Tickets Sold
                              </div>
                              <div className="font-semibold">{event.ticketsSold}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Revenue
                              </div>
                              <div className="font-semibold">${event.revenue}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past" className="pt-6">
                  {pastEvents.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        You don't have any past events
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pastEvents.map((event) => (
                        <div key={event.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold">{event.title}</h3>
                                <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                                  {event.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                                {new Date(event.date).toLocaleDateString()} • {event.time}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {event.location}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link to={`/event/${event.id}`}>
                                  View
                                </Link>
                              </Button>
                            </div>
                          </div>
                          
                          <Separator className="my-3" />
                          
                          <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Attendees
                              </div>
                              <div className="font-semibold">{event.attendees}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Tickets Sold
                              </div>
                              <div className="font-semibold">{event.ticketsSold}</div>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                Revenue
                              </div>
                              <div className="font-semibold">${event.revenue}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </TabsContent>
          
          <TabsContent value="registered">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Events You're Attending</h2>
              </div>
              
              {registeredEvents.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    You haven't registered for any events yet
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/">
                      <Calendar className="h-4 w-4 mr-2" />
                      Explore events
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {registeredEvents.map((event) => (
                    <div key={event.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-semibold mb-1">{event.title}</h3>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            {new Date(event.date).toLocaleDateString()} • {event.time}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {event.location}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Badge className="bg-event-primary hover:bg-event-secondary">
                            {event.ticketType}
                          </Badge>
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/event/${event.id}`}>
                              <Ticket className="h-4 w-4 mr-2" />
                              View Ticket
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-event-primary" />
              Account Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Manage your profile, notification preferences, and account security.
            </p>
            <Button variant="outline">
              Manage Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
