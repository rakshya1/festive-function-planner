
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import EventCard, { EventProps } from "@/components/EventCard";
import { Button } from "@/components/ui/button";

// Sample event data
const sampleEvents: EventProps[] = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date: "2025-06-15",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Technology",
    price: "299"
  },
  {
    id: "2",
    title: "Music Festival Weekend",
    date: "2025-07-22",
    time: "12:00 PM - 11:00 PM",
    location: "Golden Gate Park",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Music",
    price: "150"
  },
  {
    id: "3",
    title: "Startup Networking Mixer",
    date: "2025-06-05",
    time: "6:30 PM - 9:00 PM",
    location: "Downtown Innovation Hub",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Networking",
    price: "Free"
  },
  {
    id: "4",
    title: "Charity Run for Education",
    date: "2025-08-10",
    time: "7:00 AM - 11:00 AM",
    location: "City Park",
    imageUrl: "https://images.unsplash.com/photo-1547483238-2cbf881a559f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Sports",
    price: "25"
  },
  {
    id: "5",
    title: "Art Exhibition Opening",
    date: "2025-06-30",
    time: "5:00 PM - 9:00 PM",
    location: "Modern Art Gallery",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Art",
    price: "15"
  },
  {
    id: "6",
    title: "Food & Wine Festival",
    date: "2025-07-10",
    time: "12:00 PM - 8:00 PM",
    location: "Waterfront Plaza",
    imageUrl: "https://images.unsplash.com/photo-1527269534026-c86f4009eace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Food",
    price: "75"
  }
];

const categories = [
  "All", "Technology", "Music", "Networking", "Sports", "Art", "Food", "Business"
];

const Index = () => {
  const [filteredEvents, setFilteredEvents] = useState(sampleEvents);
  const [activeCategory, setActiveCategory] = useState("All");
  
  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredEvents(sampleEvents);
      return;
    }
    
    const filtered = sampleEvents.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredEvents(filtered);
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
      
      <section className="py-10 px-6 md:px-10 gradient-bg text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Find Your Next Experience</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Discover and join the best events happening around you
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>
      
      <section className="py-10 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Upcoming Events</h2>
          </div>
          
          <div className="mb-8 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={activeCategory === category ? "gradient-bg" : ""}
                  onClick={() => filterByCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
