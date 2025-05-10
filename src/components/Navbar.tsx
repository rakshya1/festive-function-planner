
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, PlusCircle, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="py-4 px-6 md:px-10 flex items-center justify-between shadow-sm bg-white dark:bg-gray-900">
      <Link to="/" className="flex items-center gap-2">
        <Calendar className="h-6 w-6 text-event-primary" />
        <span className="font-bold text-xl text-event-dark dark:text-white">EventHub</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-event-primary dark:hover:text-event-primary transition-colors">
          Home
        </Link>
        <Link to="/explore" className="text-gray-700 dark:text-gray-200 hover:text-event-primary dark:hover:text-event-primary transition-colors">
          Explore
        </Link>
        <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-event-primary dark:hover:text-event-primary transition-colors">
          Dashboard
        </Link>
      </div>
      
      <div className="flex items-center gap-3">
        <Button asChild variant="ghost" size="icon" className="hidden md:flex">
          <Link to="/dashboard">
            <UserCircle className="h-5 w-5" />
          </Link>
        </Button>
        <Button asChild variant="default" className="gradient-bg">
          <Link to="/create-event" className="flex items-center gap-1">
            <PlusCircle className="h-4 w-4 mr-1" />
            <span className="hidden md:inline">Create Event</span>
            <span className="md:hidden">Create</span>
          </Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
