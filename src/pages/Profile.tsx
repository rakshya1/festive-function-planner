
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Calendar, MapPin, Edit2, Save, X, Users, Activity, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Profile = () => {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  // Role-specific data
  const getRoleSpecificData = () => {
    if (user?.role === "organizer") {
      return {
        events: [
          { id: "1", title: "Tech Conference 2025", attendees: 45, status: "upcoming" },
          { id: "2", title: "Music Festival Weekend", attendees: 120, status: "published" }
        ],
        stats: { totalEvents: 2, totalAttendees: 165, activeEvents: 1 }
      };
    } else if (user?.role === "admin") {
      return {
        events: [
          { id: "1", title: "System Maintenance", type: "system", status: "scheduled" },
          { id: "2", title: "Platform Updates", type: "system", status: "completed" }
        ],
        stats: { totalUsers: 1250, totalEvents: 45, activeOrganizers: 12 }
      };
    } else {
      return {
        events: [
          { id: "1", title: "Tech Conference 2025", date: "2025-06-15", status: "upcoming" },
          { id: "3", title: "Startup Networking Mixer", date: "2025-06-05", status: "upcoming" }
        ],
        stats: { registeredEvents: 2, upcomingEvents: 2, pastEvents: 0 }
      };
    }
  };

  const roleData = getRoleSpecificData();

  const handleSave = async () => {
    const success = await updateProfile(formData);
    if (success) {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Profile</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account information and {user?.role === "admin" ? "system" : user?.role === "organizer" ? "events" : "event registrations"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information Card */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information here
                    </CardDescription>
                  </div>
                  {!isEditing ? (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancel
                      </Button>
                      <Button 
                        size="sm" 
                        onClick={handleSave}
                        className="gradient-bg"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-lg">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{user?.name}</h3>
                    <Badge variant="secondary" className="mt-1">
                      {user?.role}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{user?.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    ) : (
                      <div className="flex items-center p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span>{user?.email}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Member Since</Label>
                    <div className="flex items-center p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{new Date(user?.createdAt || '').toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <div className="flex items-center p-2 border rounded-md bg-gray-50 dark:bg-gray-800">
                      <User className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="capitalize">{user?.role}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Role-specific Sidebar */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>
                  {user?.role === "organizer" ? "My Events" : 
                   user?.role === "admin" ? "System Overview" : 
                   "Registered Events"}
                </CardTitle>
                <CardDescription>
                  {user?.role === "organizer" ? "Events you're organizing" : 
                   user?.role === "admin" ? "System statistics" : 
                   "Events you're registered for"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user?.role === "admin" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total Users</span>
                          <Users className="h-4 w-4 text-blue-500" />
                        </div>
                        <p className="text-2xl font-bold text-blue-600">{roleData.stats.totalUsers}</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Total Events</span>
                          <Activity className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-2xl font-bold text-green-600">{roleData.stats.totalEvents}</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Active Organizers</span>
                          <Settings className="h-4 w-4 text-purple-500" />
                        </div>
                        <p className="text-2xl font-bold text-purple-600">{roleData.stats.activeOrganizers}</p>
                      </div>
                    </div>
                  </div>
                ) : user?.role === "organizer" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-center p-2 bg-blue-50 dark:bg-blue-900 rounded">
                        <p className="text-lg font-bold text-blue-600">{roleData.stats.totalEvents}</p>
                        <p className="text-xs text-blue-500">Total Events</p>
                      </div>
                      <div className="text-center p-2 bg-green-50 dark:bg-green-900 rounded">
                        <p className="text-lg font-bold text-green-600">{roleData.stats.totalAttendees}</p>
                        <p className="text-xs text-green-500">Total Attendees</p>
                      </div>
                    </div>
                    {roleData.events.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                        No events created yet
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {roleData.events.map((event: any) => (
                          <div key={event.id} className="p-3 border rounded-lg">
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {event.attendees} attendees
                            </p>
                            <Badge 
                              variant={event.status === 'upcoming' ? 'default' : 'secondary'}
                              className="mt-2"
                            >
                              {event.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900 rounded-lg mb-4">
                      <p className="text-lg font-bold text-blue-600">{roleData.stats.registeredEvents}</p>
                      <p className="text-sm text-blue-500">Registered Events</p>
                    </div>
                    {roleData.events.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                        No registered events yet
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {roleData.events.map((event: any) => (
                          <div key={event.id} className="p-3 border rounded-lg">
                            <h4 className="font-medium text-sm">{event.title}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {new Date(event.date).toLocaleDateString()}
                            </p>
                            <Badge 
                              variant={event.status === 'upcoming' ? 'default' : 'secondary'}
                              className="mt-2"
                            >
                              {event.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
