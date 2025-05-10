
import React, { useState } from "react";
import { Search, Calendar, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  searchTerm: string;
  date: string | null;
  location: string | null;
  category: string | null;
}

const locations = [
  "San Francisco",
  "New York",
  "Los Angeles",
  "Chicago",
  "Miami",
  "Seattle",
  "Austin",
  "Boston",
  "Denver"
];

const categories = [
  "Technology",
  "Music",
  "Food",
  "Art",
  "Sports",
  "Networking",
  "Business",
  "Education",
  "Health"
];

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      date: date ? format(date, "yyyy-MM-dd") : null,
      location,
      category
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setDate(null);
    setLocation(null);
    setCategory(null);
    onSearch({
      searchTerm: "",
      date: null,
      location: null,
      category: null
    });
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
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={`w-full justify-start text-left font-normal ${!date ? 'text-muted-foreground' : ''}`}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex-1 flex items-center gap-2 pb-2 md:pb-0 md:px-3">
          <Popover open={isLocationOpen} onOpenChange={setIsLocationOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                className={`w-full justify-start text-left font-normal ${!location ? 'text-muted-foreground' : ''}`}
                onClick={() => setIsLocationOpen(true)}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {location || "Select location"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search location..." />
                <CommandEmpty>No location found.</CommandEmpty>
                <CommandGroup>
                  <CommandList>
                    {locations.map((city) => (
                      <CommandItem
                        key={city}
                        value={city}
                        onSelect={(value) => {
                          setLocation(value);
                          setIsLocationOpen(false);
                        }}
                      >
                        {city}
                      </CommandItem>
                    ))}
                  </CommandList>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="flex-1 flex items-center gap-2 pb-2 md:pb-0 md:px-3">
          <Select value={category || ""} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
          <Button type="submit" className="gradient-bg">
            Search
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
