
import React from "react";
import { Grid2X2, List, Map, Filter, Search, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EventProps } from "@/components/EventCard";

interface ExploreHeaderProps {
  filteredEvents: EventProps[];
  viewMode: "grid" | "list" | "map";
  onViewModeChange: (mode: "grid" | "list" | "map") => void;
  onToggleFilters: () => void;
}

const ExploreHeader = ({ 
  filteredEvents, 
  viewMode, 
  onViewModeChange, 
  onToggleFilters 
}: ExploreHeaderProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="p-6">
        {/* Title and Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              <Search className="h-6 w-6 md:h-8 md:w-8" />
              Discover Events
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Find your next amazing experience
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {filteredEvents.length} events found
            </Badge>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Mobile Filter Toggle */}
          <Button 
            variant="outline" 
            onClick={onToggleFilters}
            className="lg:hidden flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("grid")}
              className="flex items-center gap-1"
            >
              <Grid2X2 className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("list")}
              className="flex items-center gap-1"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewModeChange("map")}
              className="flex items-center gap-1"
            >
              <Map className="h-4 w-4" />
              <span className="hidden sm:inline">Map</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreHeader;
