
import React, { useState } from "react";
import { Search, Calendar, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form 
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-3 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-md"
      >
        <div className="flex-1 flex items-center gap-2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-2 md:pb-0 md:pr-3">
          <Search className="h-5 w-5 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search events..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 text-base"
          />
        </div>
        
        <div className="flex-1 flex items-center gap-2 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 pb-2 md:pb-0 md:px-3">
          <Calendar className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <Input 
            type="text" 
            placeholder="Date or Time Range" 
            className="border-none shadow-none focus-visible:ring-0 text-base"
          />
        </div>
        
        <div className="flex-1 flex items-center gap-2 pb-2 md:pb-0 md:px-3">
          <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <Input 
            type="text" 
            placeholder="Location" 
            className="border-none shadow-none focus-visible:ring-0 text-base"
          />
        </div>
        
        <Button type="submit" className="gradient-bg">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
