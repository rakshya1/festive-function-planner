
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, Share2, Bookmark, ArrowLeft, Ticket } from "lucide-react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { EventProps } from "@/components/EventCard";
import PurchaseTicketDialog from "@/components/PurchaseTicketDialog";
import { toast } from "@/hooks/use-toast";

// Sample event data
const sampleEvents: Record<string, EventProps & { description: string; organizer: string; attendees: number }> = {
  "1": {
    id: "1",
    title: "Tech Conference 2025",
    date: "2025-06-15",
    time: "9:00 AM - 5:00 PM",
    location: "San Francisco Convention Center",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Technology",
    price: "299",
    description: "Join us for the biggest tech conference of the year! Network with industry leaders, attend workshops, and gain insights into the latest technology trends. This year's event features keynote speakers from major tech companies, hands-on demonstrations of new products, and opportunities to connect with peers and potential employers.",
    organizer: "TechEvents Inc.",
    attendees: 1500
  },
  "2": {
    id: "2",
    title: "Music Festival Weekend",
    date: "2025-07-22",
    time: "12:00 PM - 11:00 PM",
    location: "Golden Gate Park",
    imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Music",
    price: "150",
    description: "A weekend of amazing music across five stages featuring top artists and emerging talents. Food vendors, art installations, and more make this an unforgettable experience for music lovers of all genres.",
    organizer: "SoundWave Productions",
    attendees: 5000
  },
  "3": {
    id: "3",
    title: "Startup Networking Mixer",
    date: "2025-06-05",
    time: "6:30 PM - 9:00 PM",
    location: "Downtown Innovation Hub",
    imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Networking",
    price: "Free",
    description: "Connect with fellow entrepreneurs, investors, and industry experts at our monthly startup mixer. Share ideas, find collaborators, and expand your professional network in a casual setting.",
    organizer: "Startup Connect",
    attendees: 120
  },
  "4": {
    id: "4",
    title: "Charity Run for Education",
    date: "2025-08-10",
    time: "7:00 AM - 11:00 AM",
    location: "City Park",
    imageUrl: "https://images.unsplash.com/photo-1547483238-2cbf881a559f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Sports",
    price: "25",
    description: "Run for a cause! All proceeds from this 5K run/walk will support educational programs for underprivileged children. Participants receive t-shirts, medals, and post-race refreshments.",
    organizer: "Education First Foundation",
    attendees: 350
  },
  "5": {
    id: "5",
    title: "Art Exhibition Opening",
    date: "2025-06-30",
    time: "5:00 PM - 9:00 PM",
    location: "Modern Art Gallery",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Art",
    price: "15",
    description: "Experience the opening night of our new contemporary art exhibition featuring works from both established and emerging artists. Meet the artists, enjoy refreshments, and be among the first to view these inspiring pieces.",
    organizer: "Modern Art Gallery",
    attendees: 200
  },
  "6": {
    id: "6",
    title: "Food & Wine Festival",
    date: "2025-07-10",
    time: "12:00 PM - 8:00 PM",
    location: "Waterfront Plaza",
    imageUrl: "https://images.unsplash.com/photo-1527269534026-c86f4009eace?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    category: "Food",
    price: "75",
    description: "Indulge in a day of culinary delights featuring tastings from top local restaurants and wineries. Chef demonstrations, food pairings, and live music create the perfect atmosphere for food enthusiasts.",
    organizer: "Culinary Arts Association",
    attendees: 1200
  }
};

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const event = id ? sampleEvents[id] : null;
  const [isPurchaseOpen, setIsPurchaseOpen] = useState(false);
  
  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-4xl mx-auto py-20 px-6 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <p className="mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out this event: ${event.title}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Event link copied to clipboard.",
      });
    }
  };

  const handleSave = () => {
    // In a real app, this would save to user's bookmarks
    toast({
      title: "Event saved!",
      description: "This event has been added to your saved events.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-6 py-8">
        <Link to="/" className="inline-flex items-center text-event-primary mb-6 hover:text-event-secondary">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to events
        </Link>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden h-64 md:h-96 mb-6">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-6">
              <Badge className="mb-3 bg-event-primary hover:bg-event-secondary">
                {event.category}
              </Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{event.title}</h1>
              
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Calendar className="h-5 w-5 text-event-primary" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Clock className="h-5 w-5 text-event-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="h-5 w-5 text-event-primary" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Users className="h-5 w-5 text-event-primary" />
                  <span>{event.attendees} attendees</span>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">About this event</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {event.description}
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Organizer</h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {event.organizer}
                </p>
              </div>
            </div>
          </div>
          
          <div className="h-fit sticky top-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-4">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">
                  {event.price === "Free" ? "Free" : `$${event.price}`}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">per ticket</p>
              </div>
              
              <Button 
                className="w-full mb-3 gradient-bg"
                onClick={() => setIsPurchaseOpen(true)}
              >
                <Ticket className="h-4 w-4 mr-2" />
                {event.price === "Free" ? "Register Now" : "Purchase Tickets"}
              </Button>
              
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleSave}>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Location</h3>
              <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden mb-3">
                {/* Map placeholder */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Interactive map would go here
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {event.location}
              </p>
            </div>
          </div>
        </div>
      </div>

      <PurchaseTicketDialog
        open={isPurchaseOpen}
        onOpenChange={setIsPurchaseOpen}
        eventTitle={event.title}
        eventId={event.id}
        price={event.price}
      />
    </div>
  );
};

export default EventDetails;
