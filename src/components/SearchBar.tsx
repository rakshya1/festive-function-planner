
import React, { useState } from "react";
import { Search, Calendar, MapPin, X } from "lucide-react";
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
    console.log('Search submitted:', { searchTerm, location, date });
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

  // Trigger search on input change for real-time search
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    onSearch({
      searchTerm: value,
      location,
      date
    });
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    onSearch({
      searchTerm,
      location: value,
      date
    });
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    onSearch({
      searchTerm,
      location,
      date: value
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border">
        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search Term */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white dark:bg-gray-700">
                <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => handleSearchChange("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Location */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white dark:bg-gray-700">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={location}
                  onChange={(e) => handleLocationChange(e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm"
                />
                {location && (
                  <button
                    type="button"
                    onClick={() => handleLocationChange("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Date */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-white dark:bg-gray-700">
                <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full bg-transparent border-none outline-none focus:ring-0 text-sm"
                />
                {date && (
                  <button
                    type="button"
                    onClick={() => handleDateChange("")}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button 
                type="submit" 
                className="gradient-bg flex-1 text-sm"
              >
                Search
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={handleClear}
                className="px-3 text-sm"
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
