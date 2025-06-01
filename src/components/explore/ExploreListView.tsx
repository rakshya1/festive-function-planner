
import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventProps } from "@/components/EventCard";
import { Link } from "react-router-dom";

interface ExploreListViewProps {
  events: EventProps[];
}

const ExploreListView = ({ events }: ExploreListViewProps) => {
  return (
    <div className="p-6">
      <div className="space-y-4">
        {events.map((event) => (
          <Card key={event.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                {/* Event Image */}
                <div className="sm:w-48 h-48 sm:h-32 flex-shrink-0">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
                  />
                </div>
                
                {/* Event Details */}
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                    <div className="flex-1">
                      {/* Category Badge */}
                      <Badge variant="secondary" className="mb-2">
                        {event.category}
                      </Badge>
                      
                      {/* Title */}
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                      
                      {/* Event Info */}
                      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date} at {event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>Available seats</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Price and Action */}
                    <div className="flex sm:flex-col items-center sm:items-end gap-3">
                      <div className="text-right">
                        <div className="text-lg font-bold">
                          {event.price === "Free" ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            <span>NPR {event.price}</span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">per ticket</div>
                      </div>
                      
                      <Button asChild className="gradient-bg whitespace-nowrap">
                        <Link to={`/event/${event.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExploreListView;
