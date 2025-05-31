
import React from "react";
import EventCard, { EventProps } from "@/components/EventCard";
import ExploreListView from "./ExploreListView";
import ExploreMapView from "./ExploreMapView";
import { ExploreFilters } from "@/pages/Explore";

interface ExploreContentProps {
  events: EventProps[];
  viewMode: "grid" | "list" | "map";
  filters: ExploreFilters;
}

const ExploreContent = ({ events, viewMode, filters }: ExploreContentProps) => {
  if (events.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-xl font-medium mb-2">No events found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Try adjusting your filters to discover more events
          </p>
        </div>
      </div>
    );
  }

  switch (viewMode) {
    case "list":
      return <ExploreListView events={events} />;
    case "map":
      return <ExploreMapView events={events} />;
    case "grid":
    default:
      return (
        <div className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      );
  }
};

export default ExploreContent;
