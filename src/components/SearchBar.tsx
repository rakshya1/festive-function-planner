
import React, { useState } from "react";
import { Search, Calendar, MapPin, Filter, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  searchTerm: string;
  date: string | null;
  location: string | null;
  category: string | null;
  priceRange?: [number, number] | null;
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
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      searchTerm,
      date: date ? format(date, "yyyy-MM-dd") : null,
      location,
      category,
      priceRange: priceRange[0] === 0 && priceRange[1] === 500 ? null : priceRange
    });
  };

  const handleReset = () => {
    setSearchTerm("");
    setDate(null);
    setLocation(null);
    setCategory(null);
    setPriceRange([0, 500]);
    onSearch({
      searchTerm: "",
      date: null,
      location: null,
      category: null,
      priceRange: null
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
          <Dialog open={showFilters} onOpenChange={setShowFilters}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Additional Filters</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium flex items-center">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Price Range
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      ${priceRange[0]} - ${priceRange[1]}
                    </div>
                  </div>
                  <Slider
                    defaultValue={priceRange}
                    min={0}
                    max={500}
                    step={5}
                    value={priceRange}
                    onValueChange={(value: [number, number]) => setPriceRange(value)}
                    className="my-6"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Free</span>
                    <span>$500</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setShowFilters(false)} className="gradient-bg">
                  Apply Filters
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          
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
