import { Club, Itinerary, UserProfile, MessageThread, NotificationItem, Reservation } from '../types';

export const INITIAL_CLUBS: Club[] = [
  {
    id: 'the-bath-club',
    number: 1,
    name: 'The Bath Club',
    address: '5937 Collins Ave, Miami Beach, FL 33140',
    city: 'Miami Beach',
    state: 'FL',
    zip: '33140',
    tags: ['Beach Club', 'Dining', 'Pool', 'Wellness'],
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.9,
    reviewsCount: 184,
    priceLevel: '$$$$',
    isFavorite: true,
    coordinates: {
      lat: 25.8385,
      lng: -80.1205,
      mapX: 63,
      mapY: 63
    },
    founded: 1926,
    description: "Miami Beach's premier historic private member beach club, celebrated for timeless European seaside glamour, secluded private beach cabanas, and culinary excellence.",
    fullBio: "Established in 1926, The Bath Club is Florida's oldest and most prestigious private social institution. Offering three acres of secluded oceanfront paradise, members enjoy pristine white-sand private beaches, private cabanas with dedicated attendants, clay tennis courts, wellness facilities, and dining crafted by celebrated international chefs.",
    amenities: ['Private Beachfront Cabanas', 'Olympic Pool', 'Clay Tennis Courts', 'Signature Mediterranean Restaurant', 'Spa & Hydrotherapy', 'Helipad Access Coordination', 'Valet & Yacht Tender'],
    dressCode: 'Resort Elegant. Collared shirts required for evening dining. Appropriate cover-ups required outside pool and beach areas.',
    openingHours: '8:00 AM – 11:00 PM Daily',
    phone: '+1 (305) 867-5937',
    membershipType: 'Full Private & Reciprocal Global'
  },
  {
    id: 'the-surf-club',
    number: 2,
    name: 'The Surf Club',
    address: '9011 Collins Ave, Surfside, FL 33154',
    city: 'Surfside',
    state: 'FL',
    zip: '33154',
    tags: ['Beach Club', 'Dining', 'Pool', 'Wellness'],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 5.0,
    reviewsCount: 230,
    priceLevel: '$$$$',
    isFavorite: true,
    coordinates: {
      lat: 25.8770,
      lng: -80.1220,
      mapX: 63,
      mapY: 51
    },
    founded: 1930,
    description: "A legendary social rendezvous for world leaders and Hollywood royalty since 1930, revived by Four Seasons with oceanfront cabanas, Michelin-starred dining, and storied elegance.",
    fullBio: "First opened on New Year's Eve in 1930, The Surf Club was founded by tire tycoon Harvey Firestone as a private sanctuary for figures like Winston Churchill, Frank Sinatra, and Elizabeth Taylor. Reimagined by Pritzker Prize-winning architect Richard Meier and designer Joseph Dirand, it represents the epitome of refined coastal luxury.",
    amenities: ['Private Oceanfront Cabanas', 'The Surf Club Restaurant by Thomas Keller', 'Full-Service Ayurvedic Spa', 'Two Heated Pools', 'Private Cigar Lounge', 'Champagne Bar'],
    dressCode: 'Sophisticated Casual by day; Smart Elegant (jackets suggested for gentlemen) after 7:00 PM.',
    openingHours: '7:00 AM – Midnight Daily',
    phone: '+1 (305) 381-3333',
    membershipType: 'Surf Club Founders & Four Seasons Elite'
  },
  {
    id: 'fisher-island-club',
    number: 3,
    name: 'Fisher Island Club',
    address: '1 Fisher Island Dr, Miami Beach, FL 33109',
    city: 'Fisher Island',
    state: 'FL',
    zip: '33109',
    tags: ['Golf', 'Tennis', 'Dining', 'Spa'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.95,
    reviewsCount: 310,
    priceLevel: '$$$$$',
    isFavorite: true,
    coordinates: {
      lat: 25.7595,
      lng: -80.1410,
      mapX: 64,
      mapY: 81
    },
    founded: 1925,
    description: "America's most affluent private island zip code, accessible strictly by private auto-ferry, yacht, or helicopter. Features a championship P.B. Dye golf course, 17 tennis courts, and Vanderbilt Mansion.",
    fullBio: "Once the private winter estate of William K. Vanderbilt II, Fisher Island Club is an impenetrable 216-acre oasis off the tip of South Beach. Members enjoy supreme privacy, world-class golf overlooking the turquoise Atlantic, an expansive marina capable of accommodating mega-yachts up to 250 feet, and bespoke island concierge.",
    amenities: ['Private Auto-Ferry & Helipad', 'P.B. Dye Championship Golf Course', '17 Grand Slam Tennis Courts', 'Deep-Water Superyacht Marina', 'The Vanderbilt Mansion', 'Spa Internazionale'],
    dressCode: 'Traditional Country Club Attire. Tailored collared shirts, soft-spike golf shoes, whites required on grass tennis courts.',
    openingHours: '6:00 AM – 11:00 PM Daily',
    phone: '+1 (305) 535-6000',
    membershipType: 'Equity Resident & Non-Resident Invitational'
  },
  {
    id: 'soho-beach-house',
    number: 4,
    name: 'Soho Beach House',
    address: '4385 Collins Ave, Miami Beach, FL 33140',
    city: 'Miami Beach',
    state: 'FL',
    zip: '33140',
    tags: ['Beach Club', 'Dining', 'Pool', 'Events'],
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80'
    ],
    rating: 4.85,
    reviewsCount: 420,
    priceLevel: '$$$$',
    isFavorite: true,
    coordinates: {
      lat: 25.8165,
      lng: -80.1235,
      mapX: 64,
      mapY: 43
    },
    founded: 2010,
    description: "An Art Deco haven for creative minds situated on Mid-Beach, featuring two pools, Cecconi's garden restaurant, Cowshed Spa, beachfront daybeds, and vibrant cultural programming.",
    fullBio: "Set over 15 floors on the Atlantic oceanfront, Soho Beach House Miami combines relaxed 1940s Cuban glamour with contemporary art collections. Members gather around the 8th-floor rooftop pool, enjoy authentic northern Italian dishes under the silver buttonwood trees at Cecconi's, and unwind at the beach club.",
    amenities: ['8th-Floor Rooftop Plunge Pool & Bar', "Cecconi's Venetian Courtyard", 'Private Beach Service', 'Cowshed Spa & Steam Rooms', 'Private Screening Room', 'Late-Night Vinyl Lounge'],
    dressCode: 'Creative Casual & Expressive. Relaxed yet chic; corporate business attire is discouraged.',
    openingHours: '7:00 AM – 2:00 AM Daily',
    phone: '+1 (786) 507-7900',
    membershipType: 'Every House & Miami Local House'
  }
];

export const INITIAL_ITINERARY: Itinerary = {
  id: 'miami-beach-getaway',
  title: 'Miami Beach Getaway',
  dateRange: 'Apr 12 – Apr 16, 2025',
  durationText: '5 Days • 4 Nights',
  clubsCount: 4,
  activitiesCount: 2,
  location: 'Miami, FL',
  status: 'upcoming',
  days: [
    {
      dayNumber: 1,
      dateStr: 'Apr 12, 2025',
      title: 'Arrival & Sunset Welcome',
      clubId: 'the-bath-club',
      clubName: 'The Bath Club',
      clubAddress: '5937 Collins Ave, Miami Beach, FL 33140',
      clubImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      timeRange: '4:00 PM – 9:00 PM',
      notes: 'Private beach cabana check-in, champagne welcome, and seaside Mediterranean dinner under the stars.'
    },
    {
      dayNumber: 2,
      dateStr: 'Apr 13, 2025',
      title: 'Beach & Lunch',
      clubId: 'the-surf-club',
      clubName: 'The Surf Club',
      clubAddress: '9011 Collins Ave, Surfside, FL 33154',
      clubImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      timeRange: '12:00 PM – 5:00 PM',
      notes: 'Reserved oceanfront cabana with private butler service. Lunch tasting menu by Chef Thomas Keller.'
    },
    {
      dayNumber: 3,
      dateStr: 'Apr 14, 2025',
      title: 'Island Escape',
      clubId: 'fisher-island-club',
      clubName: 'Fisher Island Club',
      clubAddress: '1 Fisher Island Dr, Miami Beach, FL 33109',
      clubImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
      timeRange: '10:00 AM – 6:00 PM',
      notes: 'Private tender transfer to Fisher Island, championship golf round, spa session at Spa Internazionale.'
    },
    {
      dayNumber: 4,
      dateStr: 'Apr 15, 2025',
      title: 'Evening Vibes',
      clubId: 'soho-beach-house',
      clubName: 'Soho Beach House',
      clubAddress: '4385 Collins Ave, Miami Beach, FL 33140',
      clubImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
      timeRange: '5:00 PM – 11:00 PM',
      notes: 'Rooftop plunge pool sunset cocktails, followed by chef table reservation at Cecconi’s.'
    },
    {
      dayNumber: 5,
      dateStr: 'Apr 16, 2025',
      title: 'Departure',
      timeRange: 'Private transfer to airport',
      isDeparture: true,
      notes: 'Private chauffeured Maybach transfer to Miami Executive Airport (OPF).'
    }
  ]
};

export const INITIAL_USER: UserProfile = {
  name: 'Alex Carter',
  email: 'alex.carter@example.com',
  phone: '+1 (310) 928-4412',
  tier: 'Premium Member',
  memberSince: 'October 2022',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  savedClubsCount: 4,
  visitsCount: 12,
  upcomingCount: 3,
  homeCity: 'New York & Miami',
  preferences: {
    preferredAmbience: 'Oceanfront Beachfront & Rooftop Lounges',
    dietary: 'Gluten-conscious, Organic Mediterranean, Champagne preference',
    favoriteSport: 'Clay Tennis, Yachting, Ocean Swimming',
    conciergeAlerts: true
  }
};

export const INITIAL_THREADS: MessageThread[] = [
  {
    id: 'bath-club-desk',
    contactName: 'The Bath Club Concierge',
    contactRole: 'Lead Member Host — Isabella Ortiz',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Mr. Carter, your oceanfront cabana #4 has been prepared with Dom Pérignon and chilled fruit for 4:00 PM today.',
    timestamp: '10:45 AM',
    unreadCount: 1,
    online: true,
    messages: [
      {
        id: 'm1',
        sender: 'contact',
        text: 'Good morning Alex! Looking forward to welcoming you for your upcoming Miami Beach Getaway.',
        timestamp: '10:15 AM'
      },
      {
        id: 'm2',
        sender: 'user',
        text: 'Thank you Isabella. Could we ensure the cabana is set up with extra plush towels and sparkling San Pellegrino?',
        timestamp: '10:30 AM'
      },
      {
        id: 'm3',
        sender: 'contact',
        text: 'Mr. Carter, your oceanfront cabana #4 has been prepared with Dom Pérignon and chilled fruit for 4:00 PM today. Let us know if you need valet arrival coordination.',
        timestamp: '10:45 AM'
      }
    ]
  },
  {
    id: 'soho-host',
    contactName: 'Soho Beach House VIP Desk',
    contactRole: 'Head of House Relations — Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Your table under the silver buttonwood trees at Cecconi’s is secured for 8:30 PM this Tuesday.',
    timestamp: 'Yesterday',
    unreadCount: 1,
    online: true,
    messages: [
      {
        id: 's1',
        sender: 'user',
        text: 'Hi Marcus, looking to reserve a quiet corner table for dinner on Tuesday evening after sunset.',
        timestamp: 'Yesterday 4:10 PM'
      },
      {
        id: 's2',
        sender: 'contact',
        text: 'Your table under the silver buttonwood trees at Cecconi’s is secured for 8:30 PM this Tuesday. The rooftop plunge pool cocktail hour will have live vinyl selections starting at 6:00 PM.',
        timestamp: 'Yesterday 4:45 PM'
      }
    ]
  },
  {
    id: 'fisher-island-harbor',
    contactName: 'Fisher Island Harbor & Security',
    contactRole: 'Island Guest Services',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    lastMessage: 'Your private ferry clearance and yacht tender slip have been registered under Carter-994.',
    timestamp: 'Sep 21',
    unreadCount: 1,
    online: false,
    messages: [
      {
        id: 'f1',
        sender: 'contact',
        text: 'Your private ferry clearance and yacht tender slip have been registered under Carter-994. Please present your digital member credential at Terminal West upon arrival.',
        timestamp: 'Sep 21 2:30 PM'
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Cabana Confirmed at The Bath Club',
    description: 'Your oceanfront cabana #4 has been reserved for Apr 12, 4:00 PM.',
    time: '20m ago',
    read: false,
    type: 'reservation'
  },
  {
    id: 'notif-2',
    title: 'Cecconi’s Table Reservation Confirmed',
    description: 'Dinner for 2 guests on Apr 15 at Soho Beach House has been confirmed.',
    time: '2h ago',
    read: false,
    type: 'reservation'
  },
  {
    id: 'notif-3',
    title: 'Fisher Island Ferry Access Cleared',
    description: 'Digital vehicle & guest pass issued for private ferry crossing on Apr 14.',
    time: '1d ago',
    read: false,
    type: 'invitation'
  }
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    clubId: 'the-bath-club',
    clubName: 'The Bath Club',
    clubImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
    date: 'Apr 12, 2025',
    time: '4:00 PM',
    partySize: 2,
    seatingArea: 'Oceanfront Cabana #4',
    specialRequests: 'Dom Pérignon on ice and fresh seasonal fruit platter upon arrival.',
    status: 'confirmed'
  },
  {
    id: 'res-2',
    clubId: 'soho-beach-house',
    clubName: 'Soho Beach House',
    clubImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80',
    date: 'Apr 15, 2025',
    time: '8:30 PM',
    partySize: 2,
    seatingArea: 'Cecconi’s Garden Courtyard',
    specialRequests: 'Quiet corner table under the fairy lights.',
    status: 'confirmed'
  }
];
