
import React, { useState } from "react";
import { Search, MapPin, Calendar, X } from "lucide-react";
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

  const handleSearch = () => {
    console.log('Triggering search with:', { searchTerm, location, date });
    onSearch({
      searchTerm: searchTerm.trim(),
      location: location.trim(),
      date: date
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'searchTerm') {
      setSearchTerm(value);
    } else if (field === 'location') {
      setLocation(value);
    } else if (field === 'date') {
      setDate(value);
    }
    
    // Trigger search immediately on input change
    const updatedFilters = {
      searchTerm: field === 'searchTerm' ? value : searchTerm,
      location: field === 'location' ? value : location,
      date: field === 'date' ? value : date
    };
    
    onSearch({
      searchTerm: updatedFilters.searchTerm.trim(),
      location: updatedFilters.location.trim(),
      date: updatedFilters.date
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Term Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => handleInputChange('searchTerm', e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-black placeholder-gray-500 bg-white"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => handleInputChange('searchTerm', '')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>

          {/* Location Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-black placeholder-gray-500 bg-white"
            />
            {location && (
              <button
                type="button"
                onClick={() => handleInputChange('location', '')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>

          {/* Date Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="date"
              value={date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-black bg-white"
            />
            {date && (
              <button
                type="button"
                onClick={() => handleInputChange('date', '')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-gray-700" />
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handleSearch}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Search
            </Button>
            <Button 
              onClick={handleClear}
              variant="outline"
              className="px-4 py-3 border-2 border-gray-300 hover:border-gray-400 rounded-lg transition-colors bg-white text-gray-700"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
