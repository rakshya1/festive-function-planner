
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface EventProps {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  category: string;
  price?: string;
}

const EventCard = ({ id, title, date, time, location, imageUrl, category, price }: EventProps) => {
  const eventDate = new Date(date);
  const timeFromNow = formatDistanceToNow(eventDate, { addSuffix: true });
  
  return (
    <Link to={`/event/${id}`}>
      <Card className="overflow-hidden event-card h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          {category && (
            <Badge className="absolute top-3 right-3 bg-event-primary hover:bg-event-secondary">
              {category}
            </Badge>
          )}
          {price && (
            <Badge variant="outline" className="absolute bottom-3 right-3 bg-white/80 text-black hover:bg-white">
              {price === "Free" ? "Free" : `NPR ${price}`}
            </Badge>
          )}
        </div>
        
        <CardContent className="pt-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1.5">
            <Calendar className="h-4 w-4" />
            <span>{timeFromNow}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-1.5">
            <Clock className="h-4 w-4" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{location}</span>
          </div>
        </CardContent>
        
        <CardFooter className="pt-0 pb-4">
          <Button asChild variant="outline" className="w-full border-event-primary text-event-primary hover:bg-event-primary/10">
            <span>View Details</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
