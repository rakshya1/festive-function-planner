
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import EventCard, { EventProps } from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";

// Sample event data - Nepal focused
const sampleEvents: EventProps[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date: "2025-06-15",
    time: "9:00 AM - 5:00 PM",
    location: "Kathmandu Convention Center",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Technology",
    price: "2500"
  },
  {
    id: "2",
    title: "Music Festival Weekend",
    date: "2025-07-22",
    time: "12:00 PM - 11:00 PM",
    location: "Tundikhel Ground, Kathmandu",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Music",
    price: "1200"
  },
  {
    id: "3",
    title: "Startup Networking Mixer",
    date: "2025-06-05",
    time: "6:30 PM - 9:00 PM",
    location: "Durbarmarg Innovation Hub",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Networking",
    price: "Free"
  },
  {
    id: "4",
    title: "Charity Run for Education",
    date: "2025-08-10",
    time: "7:00 AM - 11:00 AM",
    location: "Shivapuri National Park",
    imageUrl: "https://images.unsplash.com/photo-1547483238-2cbf881a559f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Sports",
    price: "200"
  },
  {
    id: "5",
    title: "Art Exhibition Opening",
    date: "2025-06-30",
    time: "5:00 PM - 9:00 PM",
    location: "Nepal Art Council, Babar Mahal",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Art",
    price: "150"
  },
  {
    id: "6",
    title: "Food & Wine Festival",
    date: "2025-07-10",
    time: "12:00 PM - 8:00 PM",
    location: "Bhrikutimandap Exhibition Hall",
    imageUrl: "https://images.unsplash.com/photo-1527269534026-c86f4009eace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Food",
    price: "800"
  }
];

const categories = [
  "All", "Technology", "Music", "Networking", "Sports", "Art", "Food", "Business"
];

const Index = () => {
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);
  const [activeCategory, setActiveCategory] = useState("All");
  
  const handleSearch = (filters: {
    searchTerm: string;
    location: string;
    date: string;
  }) => {
    let filtered = [...sampleEvents];
    
    // Filter by search term (title, category)
    if (filters.searchTerm?.trim()) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.category.toLowerCase().includes(term)
      );
    }
    
    // Filter by location
    if (filters.location?.trim()) {
      const locationTerm = filters.location.toLowerCase();
      filtered = filtered.filter(event => 
        event.location.toLowerCase().includes(locationTerm)
      );
    }
    
    // Filter by date
    if (filters.date) {
      filtered = filtered.filter(event => 
        event.date === filters.date
      );
    }
    
    setFilteredEvents(filtered);
    setActiveCategory("All");
  };
  
  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    
    if (category === "All") {
      setFilteredEvents(sampleEvents);
      return;
    }
    
    const filtered = sampleEvents.filter(event => 
      event.category === category
    );
    
    setFilteredEvents(filtered);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 md:px-10 gradient-bg text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-10 lg:mb-12 animate-fade-in">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
              Find Your Next Experience
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90 max-w-2xl mx-auto px-4">
              Discover and join the best events happening around you
            </p>
          </div>
          
          {/* Enhanced Search Bar */}
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>
      
      {/* Events Section */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
            <h2 className="text-xl sm:text-2xl font-semibold">Upcoming Events</h2>
          </div>
          
          {/* Category Filters */}
          <div className="mb-6 sm:mb-8">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`whitespace-nowrap flex-shrink-0 text-xs sm:text-sm ${
                    activeCategory === category ? "gradient-bg" : ""
                  }`}
                  size="sm"
                  onClick={() => filterByCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg sm:text-xl font-medium mb-2">No events found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} {...event} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
