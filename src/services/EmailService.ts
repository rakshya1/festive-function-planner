
import { toast } from "@/components/ui/use-toast";

// Types for email templates
export type EmailTemplate = 
  | "event-registration" 
  | "event-reminder" 
  | "event-update"
  | "event-cancellation";

export interface EmailData {
  to: string;
  subject?: string;
  templateData: Record<string, any>;
}

/**
 * Service to handle email notifications
 * In a real application, this would connect to a backend API
 * that uses NodeMailer, SendGrid, or another email service
 */
export class EmailService {
  /**
   * Send email using specified template and data
   */
  static async sendEmail(template: EmailTemplate, data: EmailData): Promise<boolean> {
    try {
      // In a real app, this would be an API call to your backend
      console.log(`Sending ${template} email to ${data.to}`, data);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Success notification
      toast({
        title: "Email sent successfully",
        description: `${this.getTemplateTitle(template)} was sent to ${data.to}`,
      });
      
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      
      // Error notification
      toast({
        title: "Failed to send email",
        description: "Please try again later",
        variant: "destructive",
      });
      
      return false;
    }
  }
  
  /**
   * Get a user-friendly title for the email template
   */
  private static getTemplateTitle(template: EmailTemplate): string {
    switch (template) {
      case "event-registration":
        return "Registration confirmation";
      case "event-reminder":
        return "Event reminder";
      case "event-update":
        return "Event update notification";
      case "event-cancellation":
        return "Event cancellation notice";
      default:
        return "Email notification";
    }
  }
  
  /**
   * Send event registration confirmation email
   */
  static async sendRegistrationConfirmation(email: string, eventTitle: string, eventDate: string, eventLocation: string): Promise<boolean> {
    return this.sendEmail("event-registration", {
      to: email,
      subject: `Registration Confirmed: ${eventTitle}`,
      templateData: {
        eventTitle,
        eventDate,
        eventLocation,
      }
    });
  }
  
  /**
   * Send event reminder email (typically 24h before)
   */
  static async sendEventReminder(email: string, eventTitle: string, eventDate: string, eventLocation: string): Promise<boolean> {
    return this.sendEmail("event-reminder", {
      to: email,
      subject: `Reminder: ${eventTitle} is tomorrow!`,
      templateData: {
        eventTitle,
        eventDate,
        eventLocation,
      }
    });
  }
  
  /**
   * Send email for event updates
   */
  static async sendEventUpdate(email: string, eventTitle: string, updates: string): Promise<boolean> {
    return this.sendEmail("event-update", {
      to: email,
      subject: `Important update for: ${eventTitle}`,
      templateData: {
        eventTitle,
        updates,
      }
    });
  }
}
