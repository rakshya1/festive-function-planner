
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/hooks/useEvents";

const categories = [
  "All", "Technology", "Music", "Networking", "Sports", "Art", "Food", "Business"
];

const Index = () => {
  const { events, loading, error, searchEvents } = useEvents();
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [activeCategory, setActiveCategory] = useState("All");
  
  // Update filtered events when events change
  React.useEffect(() => {
    setFilteredEvents(events);
  }, [events]);
  
  const handleSearch = async (filters: {
    searchTerm: string;
    location: string;
    date: string;
  }) => {
    console.log('Handling search with filters:', filters);
    
    try {
      // If all filters are empty, show all events
      if (!filters.searchTerm && !filters.location && !filters.date) {
        setFilteredEvents(events);
        setActiveCategory("All");
        return;
      }

      // Use the searchEvents function from useEvents hook
      const results = await searchEvents({
        searchTerm: filters.searchTerm,
        location: filters.location,
        date: filters.date
      });
      
      setFilteredEvents(results);
      setActiveCategory("All");
    } catch (err) {
      console.error('Search error:', err);
      setFilteredEvents([]);
    }
  };
  
  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    
    if (category === "All") {
      setFilteredEvents(events);
      return;
    }
    
    const filtered = events.filter(event => 
      event.category === category
    );
    
    setFilteredEvents(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Loading events...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </div>
      </div>
    );
  }
  
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
            </p>
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
