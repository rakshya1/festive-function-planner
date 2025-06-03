
import { EventProps } from "@/components/EventCard";

// In a real app, this would connect to a backend API
class EventService {
  private events: EventProps[] = [];
  private nextId = 1;

  constructor() {
    // Initialize with sample data
    this.events = [
      {
        id: "1",
        title: "Tech Conference 2025",
        date: "2025-06-15",
        time: "9:00 AM - 5:00 PM",
        location: "Kathmandu Convention Center",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        category: "Technology",
        price: "2500"
      },
      {
        id: "2",
        title: "Music Festival Weekend",
        date: "2025-07-22",
        time: "12:00 PM - 11:00 PM",
        location: "Tundikhel Ground, Kathmandu",
        imageUrl: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        category: "Music",
        price: "1200"
      }
    ];
    this.nextId = this.events.length + 1;
  }

  // CREATE
  async createEvent(eventData: Omit<EventProps, 'id'>): Promise<EventProps> {
    const newEvent: EventProps = {
      ...eventData,
      id: this.nextId.toString()
    };
    this.events.push(newEvent);
    this.nextId++;
    console.log('Event created:', newEvent);
    return newEvent;
  }

  // READ
  async getAllEvents(): Promise<EventProps[]> {
    console.log('Getting all events:', this.events);
    return [...this.events];
  }

  async getEventById(id: string): Promise<EventProps | null> {
    const event = this.events.find(e => e.id === id);
    console.log('Getting event by ID:', id, event);
    return event || null;
  }

  // UPDATE
  async updateEvent(id: string, updates: Partial<EventProps>): Promise<EventProps | null> {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) {
      console.log('Event not found for update:', id);
      return null;
    }
    
    this.events[index] = { ...this.events[index], ...updates };
    console.log('Event updated:', this.events[index]);
    return this.events[index];
  }

  // DELETE
  async deleteEvent(id: string): Promise<boolean> {
    const index = this.events.findIndex(e => e.id === id);
    if (index === -1) {
      console.log('Event not found for deletion:', id);
      return false;
    }
    
    this.events.splice(index, 1);
    console.log('Event deleted:', id);
    return true;
  }

  // SEARCH
  async searchEvents(filters: {
    searchTerm?: string;
    location?: string;
    date?: string;
    category?: string;
  }): Promise<EventProps[]> {
    let filtered = [...this.events];
    
    if (filters.searchTerm?.trim()) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.category.toLowerCase().includes(term)
      );
    }
    
    if (filters.location?.trim()) {
      const locationTerm = filters.location.toLowerCase();
      filtered = filtered.filter(event => 
        event.location.toLowerCase().includes(locationTerm)
      );
    }
    
    if (filters.date) {
      filtered = filtered.filter(event => 
        event.date === filters.date
      );
    }
    
    if (filters.category && filters.category !== "All") {
      filtered = filtered.filter(event => 
        event.category === filters.category
      );
    }
    
    console.log('Search results:', filtered);
    return filtered;
  }
}

// Export a singleton instance
export const eventService = new EventService();
export default eventService;
