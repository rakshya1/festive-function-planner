
export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  imageUrl?: string;
  category: string;
  organizerId: string;
  organizerName: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  capacity: number;
  ticketsSold: number;
  price: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  type: string;
  price: number;
  quantity: number;
  available: number;
  description?: string;
}

export interface Purchase {
  id: string;
  userId: string;
  eventId: string;
  ticketId: string;
  quantity: number;
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  purchaseDate: string;
  paymentMethod: string;
}

export interface EventFilters {
  searchTerm?: string;
  category?: string;
  date?: string;
  location?: string;
  priceRange?: [number, number];
  organizer?: string;
}
