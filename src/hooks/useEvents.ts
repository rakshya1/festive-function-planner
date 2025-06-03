
import { useState, useEffect } from 'react';
import { EventProps } from '@/components/EventCard';
import eventService from '@/services/EventService';
import { toast } from '@/components/ui/use-toast';

export const useEvents = () => {
  const [events, setEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const allEvents = await eventService.getAllEvents();
      setEvents(allEvents);
    } catch (err) {
      setError('Failed to load events');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (eventData: Omit<EventProps, 'id'>) => {
    try {
      setLoading(true);
      const newEvent = await eventService.createEvent(eventData);
      setEvents(prev => [...prev, newEvent]);
      toast({
        title: "Success",
        description: "Event created successfully",
      });
      return newEvent;
    } catch (err) {
      setError('Failed to create event');
      toast({
        title: "Error",
        description: "Failed to create event",
        variant: "destructive",
      });
      console.error('Error creating event:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateEvent = async (id: string, updates: Partial<EventProps>) => {
    try {
      setLoading(true);
      const updatedEvent = await eventService.updateEvent(id, updates);
      if (updatedEvent) {
        setEvents(prev => prev.map(event => 
          event.id === id ? updatedEvent : event
        ));
        toast({
          title: "Success",
          description: "Event updated successfully",
        });
        return updatedEvent;
      }
      return null;
    } catch (err) {
      setError('Failed to update event');
      toast({
        title: "Error",
        description: "Failed to update event",
        variant: "destructive",
      });
      console.error('Error updating event:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      setLoading(true);
      const success = await eventService.deleteEvent(id);
      if (success) {
        setEvents(prev => prev.filter(event => event.id !== id));
        toast({
          title: "Success",
          description: "Event deleted successfully",
        });
        return true;
      }
      return false;
    } catch (err) {
      setError('Failed to delete event');
      toast({
        title: "Error",
        description: "Failed to delete event",
        variant: "destructive",
      });
      console.error('Error deleting event:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const searchEvents = async (filters: {
    searchTerm?: string;
    location?: string;
    date?: string;
    category?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      const results = await eventService.searchEvents(filters);
      setEvents(results);
      return results;
    } catch (err) {
      setError('Failed to search events');
      console.error('Error searching events:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return {
    events,
    loading,
    error,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    searchEvents,
  };
};
