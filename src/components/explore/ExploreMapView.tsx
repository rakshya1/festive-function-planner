
import React from "react";
import { MapPin, Calendar, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EventProps } from "@/components/EventCard";

interface ExploreMapViewProps {
  events: EventProps[];
}

const ExploreMapView = ({ events }: ExploreMapViewProps) => {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
        {/* Map Placeholder */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium mb-2">Interactive Map</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Map integration will show event locations with interactive pins
            </p>
            <Badge variant="outline">Coming Soon</Badge>
          </div>
        </div>
        
        {/* Events List */}
        <div className="space-y-4 overflow-y-auto">
          <h3 className="font-semibold text-lg mb-4">Events in Selected Area</h3>
          {events.slice(0, 8).map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <Badge variant="secondary" className="text-xs">
                    {event.category}
                  </Badge>
                  <div className="text-right">
                    {event.price === "Free" ? (
                      <span className="font-bold text-green-600">Free</span>
                    ) : (
                      <div className="flex items-center gap-1 font-bold">
                        <DollarSign className="h-3 w-3" />
                        <span>{event.price}</span>
                      </div>
                    )}
                  </div>
                </div>
                <CardTitle className="text-base line-clamp-2">
                  {event.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                <Button size="sm" className="w-full gradient-bg">
                  View on Map
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExploreMapView;
