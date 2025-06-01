
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ExploreFilters from "@/components/explore/ExploreFilters";
import ExploreHeader from "@/components/explore/ExploreHeader";
import ExploreContent from "@/components/explore/ExploreContent";
import { EventProps } from "@/components/EventCard";

// Extended sample events data for explore page - Nepal focused
const exploreEvents: EventProps[] = [
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
  },
  {
    id: "7",
    title: "Digital Marketing Workshop",
    date: "2025-06-20",
    time: "10:00 AM - 4:00 PM",
    location: "Hotel Yak & Yeti, Kathmandu",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Business",
    price: "1800"
  },
  {
    id: "8",
    title: "Photography Masterclass",
    date: "2025-07-05",
    time: "2:00 PM - 6:00 PM",
    location: "Patan Durbar Square",
    imageUrl: "https://images.unsplash.com/photo-1452721226168-f75c58b6b92b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Art",
    price: "950"
  }
];

export interface ExploreFilters {
  searchTerm: string;
  categories: string[];
  dateRange: { start: Date | null; end: Date | null };
  priceRange: [number, number];
  location: string;
  radius: number;
  availability: string;
  sortBy: string;
}

const Explore = () => {
  const [filteredEvents, setFilteredEvents] = useState(exploreEvents);
  const [filters, setFilters] = useState<ExploreFilters>({
    searchTerm: "",
    categories: [],
    dateRange: { start: null, end: null },
    priceRange: [0, 500],
    location: "",
    radius: 25,
    availability: "all",
    sortBy: "date"
  });
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const applyFilters = (newFilters: ExploreFilters) => {
    let filtered = [...exploreEvents];
    
    // Apply search term filter
    if (newFilters.searchTerm.trim()) {
      const term = newFilters.searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term) ||
        event.category.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (newFilters.categories.length > 0) {
      filtered = filtered.filter(event => 
        newFilters.categories.includes(event.category)
      );
    }
    
    // Apply date range filter
    if (newFilters.dateRange.start || newFilters.dateRange.end) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        const start = newFilters.dateRange.start;
        const end = newFilters.dateRange.end;
        
        if (start && end) {
          return eventDate >= start && eventDate <= end;
        } else if (start) {
          return eventDate >= start;
        } else if (end) {
          return eventDate <= end;
        }
        return true;
      });
    }
    
    // Apply price range filter
    filtered = filtered.filter(event => {
      if (event.price === "Free") return newFilters.priceRange[0] === 0;
      const price = parseFloat(event.price!);
      return price >= newFilters.priceRange[0] && price <= newFilters.priceRange[1];
    });
    
    // Apply location filter
    if (newFilters.location.trim()) {
      filtered = filtered.filter(event => 
        event.location.toLowerCase().includes(newFilters.location.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (newFilters.sortBy) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "price":
          const priceA = a.price === "Free" ? 0 : parseFloat(a.price!);
          const priceB = b.price === "Free" ? 0 : parseFloat(b.price!);
          return priceA - priceB;
        case "name":
          return a.title.localeCompare(b.title);
        case "popularity":
          return Math.random() - 0.5; // Random for demo
        default:
          return 0;
      }
    });
    
    setFilteredEvents(filtered);
  };

  useEffect(() => {
    applyFilters(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: ExploreFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="flex">
        {/* Sidebar Filters */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
          ${isFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:relative lg:translate-x-0 lg:block
        `}>
          <ExploreFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClose={() => setIsFiltersOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <ExploreHeader
            filteredEvents={filteredEvents}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onToggleFilters={() => setIsFiltersOpen(!isFiltersOpen)}
          />
          
          <ExploreContent
            events={filteredEvents}
            viewMode={viewMode}
            filters={filters}
          />
        </div>
      </div>

      {/* Overlay for mobile when filters are open */}
      {isFiltersOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsFiltersOpen(false)}
        />
      )}
    </div>
  );
};

export default Explore;
