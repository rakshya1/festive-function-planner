
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, BarChart2, MapPin } from "lucide-react";
import StatsOverview from "@/components/dashboard/StatsOverview";
import EventsChart from "@/components/dashboard/EventsChart";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import EventsByCategory from "@/components/dashboard/EventsByCategory";

// Sample data for dashboard
const dashboardData = {
  totalEvents: 24,
  activeEvents: 18,
  totalAttendees: 458,
  totalRevenue: 12750,
  eventsToday: 3,
  categoriesCount: {
    Technology: 8,
    Music: 5,
    Networking: 4,
    Sports: 3,
    Art: 2,
    Food: 2,
  },
  registrationsOverTime: [
    { name: 'Jan', registrations: 65 },
    { name: 'Feb', registrations: 80 },
    { name: 'Mar', registrations: 110 },
    { name: 'Apr', registrations: 95 },
    { name: 'May', registrations: 130 },
    { name: 'Jun', registrations: 160 },
  ],
  eventsByMonth: [
    { name: 'Jan', count: 5 },
    { name: 'Feb', count: 6 },
    { name: 'Mar', count: 8 },
    { name: 'Apr', count: 7 },
    { name: 'May', count: 9 },
    { name: 'Jun', count: 12 },
  ]
};

const Dashboard = () => {
  const [dateFilter, setDateFilter] = useState("all");
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <button 
              onClick={() => navigate('/create-event')}
              className="gradient-bg text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              Create Event
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Monitor and manage your events from a single place
          </p>
        </header>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <StatsOverview data={dashboardData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Events by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <EventsChart data={dashboardData.eventsByMonth} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Events by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <EventsByCategory data={dashboardData.categoriesCount} />
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <UpcomingEvents />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This tab will show a detailed list of all events with filtering options.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="attendees">
            <Card>
              <CardHeader>
                <CardTitle>Attendee Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This tab will show attendee details and registration data.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Detailed Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This tab will show detailed analytics about events, attendees, and revenue.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
