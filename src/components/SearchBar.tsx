
import React, { useState } from "react";
import { Search, Calendar, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (filters: {
    searchTerm: string;
    location: string;
    date: string;
  }) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search events..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      location,
      date
    });
  };

  const handleClear = () => {
    setSearchTerm("");
    setLocation("");
    setDate("");
    onSearch({
      searchTerm: "",
      location: "",
      date: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Term */}
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
            <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Input 
              type="text" 
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-none shadow-none focus-visible:ring-0 p-0"
            />
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
            <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Input 
              type="text" 
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border-none shadow-none focus-visible:ring-0 p-0"
            />
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 px-3 py-2 border rounded-md">
            <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Input 
              type="date" 
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border-none shadow-none focus-visible:ring-0 p-0"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Button 
              type="submit" 
              className="gradient-bg flex-1"
            >
              Search
            </Button>
            <Button 
              type="button" 
              variant="outline"
              onClick={handleClear}
              className="px-3"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
