export type ActiveTab = 'booking' | 'services' | 'team' | 'gallery' | 'reviews' | 'my-appointments';

export interface TimeSlot {
  id: string;
  time: string; // e.g. "10:00 AM"
  period: 'morning' | 'afternoon' | 'evening';
  available: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  credentials: string;
  specialties: string[];
  bio: string;
  education: string;
  image: string;
  rating: number;
  reviewsCount: number;
  availableDays: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  category: 'general' | 'cosmetic' | 'restorative' | 'ortho' | 'emergency';
  description: string;
  duration: string;
  priceRange: string;
  insuranceCovered: boolean;
  highlights: string[];
  icon: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  patientNote: string;
  treatmentDuration: string;
  doctorName: string;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  date: string;
  procedure: string;
  comment: string;
  verified: boolean;
  doctorName?: string;
}

export interface Appointment {
  id: string;
  referenceNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  doctorId: string;
  doctorName: string;
  reason: string;
  reasonLabel: string;
  notes?: string;
  dateStr: string; // e.g. "2024-10-15" or "Oct 15, 2024"
  formattedDate: string; // "Tuesday, Oct 15, 2024"
  timeSlot: string; // "10:00 AM"
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
