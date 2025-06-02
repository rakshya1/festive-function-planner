
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  Mail, 
  Shield, 
  Moon, 
  Sun, 
  Globe, 
  Trash2, 
  LogOut,
  Settings as SettingsIcon,
  Users,
  Database,
  Activity
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { useTheme } from "next-themes";

const Settings = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    eventReminders: true,
    marketingEmails: false,
    darkMode: theme === 'dark',
    // Admin/Organizer specific settings
    systemNotifications: user?.role === 'admin',
    eventAnalytics: user?.role === 'organizer' || user?.role === 'admin',
    autoApprove: user?.role === 'organizer',
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    if (key === 'darkMode') {
      setTheme(value ? 'dark' : 'light');
    }
    
    toast({
      title: "Settings updated",
      description: "Your preferences have been saved.",
    });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion requested",
      description: "This feature is not implemented yet. Contact support for account deletion.",
      variant: "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <SettingsIcon className="h-8 w-8 mr-3" />
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Manage your account preferences and {user?.role === 'admin' ? 'system settings' : user?.role === 'organizer' ? 'event management settings' : 'privacy settings'}
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>
                Your account details and status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    {user?.role}
                  </Badge>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/profile")}
                >
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </CardTitle>
              <CardDescription>
                Configure how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications" className="flex items-center cursor-pointer">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Notifications
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive {user?.role === 'admin' ? 'system updates' : user?.role === 'organizer' ? 'event updates' : 'event updates'} via email
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="eventReminders" className="flex items-center cursor-pointer">
                    <Bell className="h-4 w-4 mr-2" />
                    {user?.role === 'organizer' ? 'Event Management Alerts' : 'Event Reminders'}
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.role === 'organizer' ? 'Get alerted about event registrations and updates' : 'Get reminded about upcoming events'}
                  </p>
                </div>
                <Switch
                  id="eventReminders"
                  checked={settings.eventReminders}
                  onCheckedChange={(checked) => handleSettingChange('eventReminders', checked)}
                />
              </div>

              {user?.role === 'admin' && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="systemNotifications" className="flex items-center cursor-pointer">
                        <Database className="h-4 w-4 mr-2" />
                        System Notifications
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive critical system alerts and maintenance updates
                      </p>
                    </div>
                    <Switch
                      id="systemNotifications"
                      checked={settings.systemNotifications}
                      onCheckedChange={(checked) => handleSettingChange('systemNotifications', checked)}
                    />
                  </div>
                </>
              )}

              {(user?.role === 'organizer' || user?.role === 'admin') && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="eventAnalytics" className="flex items-center cursor-pointer">
                        <Activity className="h-4 w-4 mr-2" />
                        Analytics Reports
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive weekly analytics and performance reports
                      </p>
                    </div>
                    <Switch
                      id="eventAnalytics"
                      checked={settings.eventAnalytics}
                      onCheckedChange={(checked) => handleSettingChange('eventAnalytics', checked)}
                    />
                  </div>
                </>
              )}

              {user?.role === 'organizer' && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="autoApprove" className="flex items-center cursor-pointer">
                        <Users className="h-4 w-4 mr-2" />
                        Auto-approve Registrations
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Automatically approve event registrations without manual review
                      </p>
                    </div>
                    <Switch
                      id="autoApprove"
                      checked={settings.autoApprove}
                      onCheckedChange={(checked) => handleSettingChange('autoApprove', checked)}
                    />
                  </div>
                </>
              )}

              {user?.role === 'attendee' && (
                <>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketingEmails" className="flex items-center cursor-pointer">
                        <Mail className="h-4 w-4 mr-2" />
                        Marketing Emails
                      </Label>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive promotional content and offers
                      </p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={settings.marketingEmails}
                      onCheckedChange={(checked) => handleSettingChange('marketingEmails', checked)}
                    />
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                {theme === 'dark' ? <Moon className="h-5 w-5 mr-2" /> : <Sun className="h-5 w-5 mr-2" />}
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="darkMode" className="flex items-center cursor-pointer">
                    {settings.darkMode ? <Moon className="h-4 w-4 mr-2" /> : <Sun className="h-4 w-4 mr-2" />}
                    Dark Mode
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Switch between light and dark themes
                  </p>
                </div>
                <Switch
                  id="darkMode"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Manage your privacy and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Data Privacy</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Your data is encrypted and securely stored. We never share your personal information with third parties without your consent.
                </p>
                <Button variant="outline" size="sm">
                  Download My Data
                </Button>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Account Security</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Keep your account secure by using a strong password and enabling two-factor authentication.
                </p>
                <Button variant="outline" size="sm">
                  Change Password
                </Button>
              </div>

              {user?.role === 'admin' && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-2">System Access</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      As an admin, you have elevated privileges. Ensure your account is always secure.
                    </p>
                    <Button variant="outline" size="sm">
                      View Access Logs
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Sign Out</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sign out of your account on this device
                  </p>
                </div>
                <Button variant="outline" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-red-600 dark:text-red-400">Delete Account</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Permanently delete your account and all associated data
                    {user?.role === 'organizer' && ' (including all your events)'}
                    {user?.role === 'admin' && ' (this will require another admin to approve)'}
                  </p>
                </div>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
