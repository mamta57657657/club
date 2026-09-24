export interface Club {
  id: string;
  number: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  tags: string[];
  image: string;
  gallery?: string[];
  rating: number;
  reviewsCount: number;
  priceLevel: string;
  isFavorite: boolean;
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // percentage on custom map
    mapY: number; // percentage on custom map
  };
  founded: number;
  description: string;
  fullBio?: string;
  amenities: string[];
  dressCode: string;
  openingHours: string;
  phone: string;
  membershipType: string;
}

export interface DayActivity {
  dayNumber: number;
  dateStr: string;
  title: string;
  clubId?: string;
  clubName?: string;
  clubAddress?: string;
  clubImage?: string;
  timeRange: string;
  isDeparture?: boolean;
  notes?: string;
}

export interface Itinerary {
  id: string;
  title: string;
  dateRange: string;
  durationText: string;
  clubsCount: number;
  activitiesCount: number;
  location: string;
  status: 'upcoming' | 'past' | 'saved';
  days: DayActivity[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'club_concierge';
  text: string;
  timestamp: string;
  actions?: string[];
  clubRecommendationId?: string;
}

export interface MessageThread {
  id: string;
  contactName: string;
  contactRole: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  online: boolean;
  messages: {
    id: string;
    sender: 'user' | 'contact';
    text: string;
    timestamp: string;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  tier: string;
  memberSince: string;
  avatar: string;
  savedClubsCount: number;
  visitsCount: number;
  upcomingCount: number;
  homeCity: string;
  preferences: {
    preferredAmbience: string;
    dietary: string;
    favoriteSport: string;
    conciergeAlerts: boolean;
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'reservation' | 'invitation' | 'system' | 'message';
}

export interface Reservation {
  id: string;
  clubId: string;
  clubName: string;
  clubImage: string;
  date: string;
  time: string;
  partySize: number;
  seatingArea: string;
  specialRequests?: string;
  status: 'confirmed' | 'pending' | 'completed';
}
