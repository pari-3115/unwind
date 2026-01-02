
export enum UserRole {
  TRAVELLER = 'TRAVELLER',
  OWNER = 'OWNER',
  ADMIN = 'ADMIN'
}

export interface SiteConfig {
  primaryColor: string;
  heroImageUrl: string;
  logoUrl?: string;
  siteName: string;
  tagline: string;
  privacyContent: string;
  safetyContent: string;
  supportContent: string;
  aboutContent: string;
  contactContent: string;
}

export interface Checkpoint {
  id: string;
  label: string;
  description: string;
  isVerified: boolean;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Plot {
  id: string;
  ownerId: string;
  ownerName: string;
  title: string;
  description: string;
  location: string;
  coordinates: { lat: number; lng: number };
  pricePerNight: number;
  imageUrl: string;
  amenities: {
    evCharging: boolean;
    bathroom: boolean;
    waterHookup: boolean;
    wifi: boolean;
    petFriendly: boolean;
  };
  checkpoints: Checkpoint[];
  reviews: Review[];
  overallRating: number;
  status: 'available' | 'booked' | 'maintenance';
}

export interface Booking {
  id: string;
  plotId: string;
  travellerId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  plotTitle?: string;
  plotLocation?: string;
  plotImageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  savedPlotIds: string[];
}
