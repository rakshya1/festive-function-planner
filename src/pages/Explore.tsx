
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import SearchBar, { SearchFilters } from "@/components/SearchBar";
import EventCard, { EventProps } from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, TrendingUp } from "lucide-react";

// Extended sample events data for explore page
const exploreEvents: EventProps[] = [
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
  },
  {
    id: "7",
    title: "Digital Marketing Workshop",
    date: "2025-06-20",
    time: "10:00 AM - 4:00 PM",
    location: "Business Center Downtown",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Business",
    price: "199"
  },
  {
    id: "8",
    title: "Photography Masterclass",
    date: "2025-07-05",
    time: "2:00 PM - 6:00 PM",
    location: "Creative Studio",
    imageUrl: "https://images.unsplash.com/photo-1452721226168-f75c58b6b92b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Art",
    price: "89"
  }
];

const categories = [
  "All", "Technology", "Music", "Networking", "Sports", "Art", "Food", "Business"
];

const featuredCategories = [
  { name: "Technology", count: 12, icon: TrendingUp },
  { name: "Music", count: 8, icon: Users },
  { name: "Art", count: 15, icon: Calendar },
  { name: "Food", count: 6, icon: MapPin }
];

const Explore = () => {
  const [filteredEvents, setFilteredEvents] = useState(exploreEvents);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  
  const handleSearch = (filters: SearchFilters) => {
    let filtered = [...exploreEvents];
    
    // Filter by search term
    if (filters.searchTerm?.trim()) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term) ||
        event.category.toLowerCase().includes(term)
      );
    }
    
    // Filter by date
    if (filters.date) {
      filtered = filtered.filter(event => event.date === filters.date);
    }
    
    // Filter by location
    if (filters.location) {
      filtered = filtered.filter(event => 
        event.location.includes(filters.location!)
      );
    }
    
    // Filter by category
    if (filters.category && activeCategory === "All") {
      filtered = filtered.filter(event => 
        event.category === filters.category
      );
    }
    
    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(event => {
        if (event.price === "Free") return filters.priceRange![0] === 0;
        const price = parseFloat(event.price!);
        return price >= filters.priceRange![0] && price <= filters.priceRange![1];
      });
    }
    
    setFilteredEvents(filtered);
  };
  
  const filterByCategory = (category: string) => {
    setActiveCategory(category);
    
    if (category === "All") {
      setFilteredEvents(exploreEvents);
      return;
    }
    
    const filtered = exploreEvents.filter(event => 
      event.category === category
    );
    
    setFilteredEvents(filtered);
  };
  
  const sortEvents = (sortType: string) => {
    setSortBy(sortType);
    const sorted = [...filteredEvents].sort((a, b) => {
      switch (sortType) {
        case "date":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "price":
          const priceA = a.price === "Free" ? 0 : parseFloat(a.price!);
          const priceB = b.price === "Free" ? 0 : parseFloat(b.price!);
          return priceA - priceB;
        case "name":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    setFilteredEvents(sorted);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <section className="py-8 px-6 md:px-10 bg-white dark:bg-gray-800 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Explore Events</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover amazing events happening in your area and beyond
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>
      
      <section className="py-8 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {featuredCategories.map((category) => (
              <Card key={category.name} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm">
                    <category.icon className="h-4 w-4" />
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{category.count}</p>
                  <p className="text-sm text-gray-500">events</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={activeCategory === category ? "gradient-bg" : ""}
                  onClick={() => filterByCategory(category)}
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <Button
                variant={sortBy === "date" ? "default" : "outline"}
                onClick={() => sortEvents("date")}
                size="sm"
              >
                Date
              </Button>
              <Button
                variant={sortBy === "price" ? "default" : "outline"}
                onClick={() => sortEvents("price")}
                size="sm"
              >
                Price
              </Button>
              <Button
                variant={sortBy === "name" ? "default" : "outline"}
                onClick={() => sortEvents("name")}
                size="sm"
              >
                Name
              </Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Badge variant="outline">{filteredEvents.length} events found</Badge>
              {activeCategory !== "All" && (
                <Badge className="gradient-bg">{activeCategory}</Badge>
              )}
            </div>
          </div>
          
          {filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No events found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Try adjusting your search criteria or browse all events
              </p>
              <Button onClick={() => filterByCategory("All")} variant="outline">
                Show All Events
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

export default Explore;
