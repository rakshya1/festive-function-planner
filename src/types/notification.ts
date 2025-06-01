
export interface Notification {
  id: string;
  userId: string;
  type: 'email' | 'in-app';
  category: 'event' | 'ticket' | 'system' | 'reminder';
  title: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
  actionUrl?: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[];
}
