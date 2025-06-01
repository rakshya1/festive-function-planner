
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Users, BarChart2, MapPin, Mail, Shield, UserCheck } from "lucide-react";
import StatsOverview from "@/components/dashboard/StatsOverview";
import EventsChart from "@/components/dashboard/EventsChart";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import EventsByCategory from "@/components/dashboard/EventsByCategory";
import EmailNotifications from "@/components/dashboard/EmailNotifications";

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
  const { user } = useAuth();
  const navigate = useNavigate();

  const getDashboardTheme = (role: string) => {
    switch (role) {
      case 'admin':
        return 'admin-bg';
      case 'organizer':
        return 'organizer-bg';
      case 'attendee':
        return 'attendee-bg';
      default:
        return 'bg-gray-50 dark:bg-gray-900';
    }
  };

  const getCreateButtonClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg';
      case 'organizer':
        return 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg';
      case 'attendee':
        return 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white shadow-lg';
      default:
        return 'gradient-bg';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-5 w-5" />;
      case 'organizer':
        return <Users className="h-5 w-5" />;
      case 'attendee':
        return <UserCheck className="h-5 w-5" />;
      default:
        return <BarChart2 className="h-5 w-5" />;
    }
  };

  const getDashboardTitle = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Admin Dashboard';
      case 'organizer':
        return 'Organizer Dashboard';
      case 'attendee':
        return 'Attendee Dashboard';
      default:
        return 'Dashboard';
    }
  };

  const getDashboardDescription = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Manage system-wide events, users, and analytics';
      case 'organizer':
        return 'Monitor and manage your events from a single place';
      case 'attendee':
        return 'Track your event registrations and interests';
      default:
        return 'Monitor and manage your events from a single place';
    }
  };
  
  return (
    <div className={`min-h-screen ${getDashboardTheme(user?.role || '')}`}>
      <Navbar />
      
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getRoleIcon(user?.role || '')}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {getDashboardTitle(user?.role || '')}
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {getDashboardDescription(user?.role || '')}
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate('/create-event')}
              className={`${getCreateButtonClass(user?.role || '')} px-4 py-2 rounded-md flex items-center gap-2 hover:scale-105 transition-transform`}
            >
              Create Event
            </button>
          </div>
        </header>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="attendees">Attendees</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <StatsOverview data={dashboardData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={user?.role === 'admin' ? 'admin-card' : user?.role === 'organizer' ? 'organizer-card' : 'attendee-card'}>
                <CardHeader>
                  <CardTitle className="text-lg">Events by Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <EventsChart data={dashboardData.eventsByMonth} />
                </CardContent>
              </Card>
              
              <Card className={user?.role === 'admin' ? 'admin-card' : user?.role === 'organizer' ? 'organizer-card' : 'attendee-card'}>
                <CardHeader>
                  <CardTitle className="text-lg">Events by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <EventsByCategory data={dashboardData.categoriesCount} />
                </CardContent>
              </Card>
            </div>
            
            <Card className={user?.role === 'admin' ? 'admin-card' : user?.role === 'organizer' ? 'organizer-card' : 'attendee-card'}>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <UpcomingEvents />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="events">
            <Card className={user?.role === 'admin' ? 'admin-card' : user?.role === 'organizer' ? 'organizer-card' : 'attendee-card'}>
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
            <Card className={user?.role === 'admin' ? 'admin-card' : user?.role === 'organizer' ? 'organizer-card' : 'attendee-card'}>
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
          
          <TabsContent value="communications">
            <div className="space-y-6">
              <EmailNotifications />
              
              <Card className={user?.role === 'admin' ? 'admin-card' : user?.role === 'organizer' ? 'organizer-card' : 'attendee-card'}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Email Templates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Manage your email templates for different notification types. This feature would allow customizing templates.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card className={user?.role === 'admin' ? 'admin-card' : user?.role === 'organizer' ? 'organizer-card' : 'attendee-card'}>
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
