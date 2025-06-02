
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search events..." }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-lg p-2 shadow-lg">
        <div className="flex-1 flex items-center gap-2 px-3">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <Input 
            type="text" 
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 text-base"
          />
        </div>
        <Button 
          type="submit" 
          className="gradient-bg px-6"
        >
          Search
        </Button>
      </div>
    </form>
  );
};

export default SearchBar;
