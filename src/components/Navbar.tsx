
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Home, Search, Calendar, Plus, BarChart3, User, LogOut, Settings, Bell, Menu, X, Shield, Users, UserCheck } from "lucide-react";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getRoleBadgeClass = (role: string) => {
    switch (role) {
      case 'admin':
        return 'role-admin text-white shadow-lg';
      case 'organizer':
        return 'role-organizer text-white shadow-lg';
      case 'attendee':
        return 'role-attendee text-white shadow-lg';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-3 w-3" />;
      case 'organizer':
        return <Users className="h-3 w-3" />;
      case 'attendee':
        return <UserCheck className="h-3 w-3" />;
      default:
        return <User className="h-3 w-3" />;
    }
  };

  const getNavbarTheme = (role: string) => {
    switch (role) {
      case 'admin':
        return 'admin-bg border-red-200';
      case 'organizer':
        return 'organizer-bg border-blue-200';
      case 'attendee':
        return 'attendee-bg border-green-200';
      default:
        return 'bg-white dark:bg-gray-900';
    }
  };

  const getLogoutButtonClass = (role: string) => {
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

  // Role-based navigation links
  const getNavLinks = () => {
    const baseLinks = [
      { to: "/", icon: Home, label: "Home" },
      { to: "/explore", icon: Search, label: "Explore" },
    ];

    if (!isAuthenticated) return baseLinks;

    if (user?.role === 'attendee') {
      // Attendees can only view and explore events
      return baseLinks;
    }

    if (user?.role === 'organizer') {
      // Organizers can create events but no dashboard
      return [
        ...baseLinks,
        { to: "/create-event", icon: Plus, label: "Create Event" },
      ];
    }

    if (user?.role === 'admin') {
      // Admins have full access
      return [
        ...baseLinks,
        { to: "/create-event", icon: Plus, label: "Create Event" },
        { to: "/dashboard", icon: BarChart3, label: "Dashboard" },
      ];
    }

    return baseLinks;
  };

  const navLinks = getNavLinks();

  return (
    <nav className={`${getNavbarTheme(user?.role || '')} shadow-md border-b transition-all duration-300`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Calendar className="h-8 w-8 gradient-bg p-1 rounded text-white group-hover:animate-pulse-glow transition-all duration-300" />
            <span className="text-xl font-bold gradient-bg bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors hover:scale-105 transform duration-200"
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative hover:scale-110 transition-transform">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                    3
                  </span>
                </Button>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center space-x-2 p-2 hover:scale-105 transition-transform">
                      <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className={getRoleBadgeClass(user?.role || '')}>
                          {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="hidden md:block text-left">
                        <div className="text-sm font-medium">{user?.name}</div>
                        <Badge className={`text-xs ${getRoleBadgeClass(user?.role || '')} flex items-center gap-1`}>
                          {getRoleIcon(user?.role || '')}
                          {user?.role}
                        </Badge>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {getRoleIcon(user?.role || '')}
                        <span className="capitalize">{user?.role} Account</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-muted">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')} className="hover:bg-muted">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      {user?.role === 'admin' ? 'Admin Logout' : 
                       user?.role === 'organizer' ? 'Organizer Logout' : 
                       'Sign Out'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigate('/login')} className="hover:scale-105 transition-transform">
                  Sign In
                </Button>
                <Button className="gradient-bg hover:scale-105 transition-transform shadow-lg" onClick={() => navigate('/register')}>
                  Sign Up
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:scale-110 transition-transform"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map(({ to, icon: Icon, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-primary hover:bg-gray-50 rounded transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
              
              {!isAuthenticated && (
                <>
                  <Button
                    variant="ghost"
                    className="justify-start"
                    onClick={() => {
                      navigate('/login');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="gradient-bg justify-start"
                    onClick={() => {
                      navigate('/register');
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
