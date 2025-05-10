
import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

// Sample upcoming events data
const upcomingEvents = [
  {
    id: "1",
    title: "Tech Conference 2025",
    date: "2025-06-15",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    organizer: "TechCorp Inc.",
    attendees: 125,
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    status: "active",
  },
  {
    id: "2",
    title: "Music Festival Weekend",
    date: "2025-07-22",
    time: "12:00 PM - 11:00 PM",
    location: "Golden Gate Park",
    organizer: "SoundWave Productions",
    attendees: 350,
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    status: "active",
  },
  {
    id: "3",
    title: "Startup Networking Mixer",
    date: "2025-06-05",
    time: "6:30 PM - 9:00 PM",
    location: "Downtown Innovation Hub",
    organizer: "Founders Network",
    attendees: 75,
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    status: "draft",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="space-y-4">
      {upcomingEvents.map((event) => (
        <div
          key={event.id}
          className="flex flex-col sm:flex-row items-start gap-4 p-4 border border-gray-100 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
        >
          <div className="h-20 w-20 sm:h-16 sm:w-16 rounded-md overflow-hidden flex-shrink-0">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="h-full w-full object-cover"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
              <div>
                <Link 
                  to={`/event/${event.id}`}
                  className="text-lg font-medium hover:text-event-primary dark:hover:text-event-primary transition-colors"
                >
                  {event.title}
                </Link>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDistanceToNow(new Date(event.date), { addSuffix: true })} • {event.time}
                </div>
              </div>
              
              <Badge variant={event.status === 'active' ? "default" : "outline"} className={event.status === 'active' ? "gradient-bg" : ""}>
                {event.status === 'active' ? 'Published' : 'Draft'}
              </Badge>
            </div>
            
            <div className="mt-2 flex flex-wrap items-center gap-4">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                <span className="font-medium">{event.attendees}</span> registered
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {event.location}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="flex justify-center mt-4">
        <Link 
          to="/create-event"
          className="text-event-primary hover:text-event-secondary dark:text-event-primary dark:hover:text-event-secondary transition-colors text-sm font-medium"
        >
          + Add New Event
        </Link>
      </div>
    </div>
  );
};

export default UpcomingEvents;
