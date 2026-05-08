// Mock data for the Eat Halal application - South African Market

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  cuisines: string[];
  priceRange: "R" | "RR" | "RRR" | "RRRR";
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isClaimed: boolean;
  isVerified: boolean;
  certificationBody?: string;
  certificationNumber?: string;
  certificationExpiry?: string;
  phone?: string;
  website?: string;
  hours?: Record<string, string>;
  photos: string[];
  latitude?: number;
  longitude?: number;
  featured?: boolean;
  trending?: boolean;
}

export interface Review {
  id: string;
  restaurantId: string;
  restaurantName: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  body: string;
  photos: string[];
  createdAt: string;
  likeCount: number;
  isLiked?: boolean;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  bio: string;
  reviewCount: number;
  level: string;
  joinedAt: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
}

export interface Staff {
  id: string;
  restaurantId: string;
  name: string;
  role: string;
  photoUrl: string;
  tipLink?: string;
}

// South African Halal Certification Bodies (Recognized by SANHA and MJC)
export const saCertificationBodies = [
  {
    id: "sanha",
    name: "SANHA",
    fullName: "South African National Halaal Authority",
    description: "The largest and most recognized Halal certification body in South Africa, established in 1996.",
    website: "https://www.sanha.org.za",
    verificationUrl: "https://www.sanha.org.za/verify",
  },
  {
    id: "mjc",
    name: "MJC",
    fullName: "Muslim Judicial Council Halaal Trust",
    description: "One of the oldest Islamic organizations in South Africa, providing Halal certification since 1945.",
    website: "https://www.mjc.org.za",
    verificationUrl: "https://www.mjc.org.za/halaal",
  },
  {
    id: "niht",
    name: "NIHT",
    fullName: "National Independent Halaal Trust",
    description: "Independent Halal certification body operating across South Africa.",
    website: "https://www.niht.org.za",
  },
  {
    id: "icsa",
    name: "ICSA",
    fullName: "Islamic Council of South Africa",
    description: "Provides Halal certification and Islamic guidance services.",
    website: "https://www.icsa.org.za",
  },
];

// South African Halal Regulations and Compliance Info
export const saHalalRegulations = {
  title: "South African Halal Regulations",
  overview: "Halal certification in South Africa is governed by recognized Islamic authorities and is voluntary but widely respected. The main regulatory framework ensures products and establishments meet Islamic dietary requirements.",
  keyPoints: [
    {
      title: "Consumer Protection Act",
      description: "Under the Consumer Protection Act 68 of 2008, Halal claims must be truthful and verifiable. False Halal claims can result in prosecution.",
    },
    {
      title: "SABS Standards",
      description: "SANS 1049:2017 provides the South African National Standard for Halal requirements, developed in consultation with Islamic authorities.",
    },
    {
      title: "Certification Requirements",
      description: "Establishments must undergo regular audits, maintain proper documentation, ensure no cross-contamination, and source from certified suppliers.",
    },
    {
      title: "Verification Process",
      description: "Consumers can verify Halal certification through official certification body databases. Look for valid certificates displayed at establishments.",
    },
  ],
  reportingInfo: {
    title: "Report Non-Compliance",
    description: "If you suspect a Halal violation, report to SANHA, MJC, or the National Consumer Commission.",
    contacts: [
      { body: "SANHA Helpline", contact: "0861 786 111" },
      { body: "MJC Halaal Trust", contact: "021 684 4500" },
      { body: "National Consumer Commission", contact: "0860 003 600" },
    ],
  },
};

export const saProvinces = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
];

export const saCities = [
  { name: "Johannesburg", province: "Gauteng" },
  { name: "Cape Town", province: "Western Cape" },
  { name: "Durban", province: "KwaZulu-Natal" },
  { name: "Pretoria", province: "Gauteng" },
  { name: "Port Elizabeth", province: "Eastern Cape" },
  { name: "Bloemfontein", province: "Free State" },
  { name: "East London", province: "Eastern Cape" },
  { name: "Polokwane", province: "Limpopo" },
  { name: "Nelspruit", province: "Mpumalanga" },
  { name: "Kimberley", province: "Northern Cape" },
  { name: "Sandton", province: "Gauteng" },
  { name: "Soweto", province: "Gauteng" },
  { name: "Centurion", province: "Gauteng" },
  { name: "Midrand", province: "Gauteng" },
  { name: "Stellenbosch", province: "Western Cape" },
];

export const cuisineTypes = [
  "Cape Malay",
  "Indian",
  "Pakistani",
  "Middle Eastern",
  "Turkish",
  "Lebanese",
  "Moroccan",
  "Egyptian",
  "Nigerian",
  "Somali",
  "Ethiopian",
  "South African BBQ",
  "Braai",
  "Bunny Chow",
  "Gatsbys",
  "Malaysian",
  "Indonesian",
  "Bengali",
  "Afghan",
  "Persian",
  "Mediterranean",
  "Chinese",
  "Thai",
  "American",
  "Burgers",
  "Pizza",
  "Seafood",
  "Steakhouse",
];

export const mockRestaurants: Restaurant[] = [
  {
    id: "r_001",
    name: "Bismillah Restaurant",
    address: "123 Fordsburg Square",
    city: "Johannesburg",
    province: "Gauteng",
    cuisines: ["Indian", "Cape Malay"],
    priceRange: "RR",
    rating: 4.8,
    reviewCount: 342,
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "SANHA",
    certificationNumber: "SANHA-JHB-2024-0891",
    certificationExpiry: "2025-03-15",
    phone: "+27 11 836 9000",
    website: "https://bismillahrestaurant.co.za",
    photos: [
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop",
    ],
    featured: true,
    trending: true,
  },
  {
    id: "r_002",
    name: "Bo-Kaap Kitchen",
    address: "78 Wale Street",
    city: "Cape Town",
    province: "Western Cape",
    cuisines: ["Cape Malay", "South African BBQ"],
    priceRange: "RRR",
    rating: 4.6,
    reviewCount: 256,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "MJC",
    certificationNumber: "MJC-CPT-2024-1234",
    certificationExpiry: "2025-06-30",
    photos: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    ],
    featured: true,
  },
  {
    id: "r_003",
    name: "Durban Spice",
    address: "45 Florida Road",
    city: "Durban",
    province: "KwaZulu-Natal",
    cuisines: ["Indian", "Bunny Chow"],
    priceRange: "RR",
    rating: 4.5,
    reviewCount: 189,
    imageUrl: "https://images.unsplash.com/photo-1540914124281-342587941389?w=800&h=600&fit=crop",
    isClaimed: false,
    isVerified: true,
    certificationBody: "SANHA",
    certificationNumber: "SANHA-DBN-2024-0456",
    certificationExpiry: "2025-01-20",
    photos: [
      "https://images.unsplash.com/photo-1540914124281-342587941389?w=800&h=600&fit=crop",
    ],
    trending: true,
  },
  {
    id: "r_004",
    name: "The Halaal Steakhouse",
    address: "Sandton City Mall",
    city: "Sandton",
    province: "Gauteng",
    cuisines: ["Steakhouse", "South African BBQ"],
    priceRange: "RRRR",
    rating: 4.7,
    reviewCount: 178,
    imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "SANHA",
    certificationNumber: "SANHA-JHB-2024-0567",
    certificationExpiry: "2025-08-10",
    photos: [
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop",
    ],
    featured: true,
  },
  {
    id: "r_005",
    name: "Mariam's Kitchen",
    address: "12 Grey Street",
    city: "Durban",
    province: "KwaZulu-Natal",
    cuisines: ["Indian", "Bengali"],
    priceRange: "R",
    rating: 4.3,
    reviewCount: 234,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "SANHA",
    certificationNumber: "SANHA-DBN-2024-0789",
    certificationExpiry: "2025-04-25",
    photos: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    ],
    trending: true,
  },
  {
    id: "r_006",
    name: "Tasty Halaal Burgers",
    address: "Melrose Arch",
    city: "Johannesburg",
    province: "Gauteng",
    cuisines: ["American", "Burgers"],
    priceRange: "RR",
    rating: 4.4,
    reviewCount: 456,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "SANHA",
    certificationNumber: "SANHA-JHB-2024-0234",
    certificationExpiry: "2025-09-15",
    photos: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    ],
    featured: true,
    trending: true,
  },
  {
    id: "r_007",
    name: "Persian Palace",
    address: "V&A Waterfront",
    city: "Cape Town",
    province: "Western Cape",
    cuisines: ["Persian", "Middle Eastern"],
    priceRange: "RRR",
    rating: 4.9,
    reviewCount: 123,
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "MJC",
    certificationNumber: "MJC-CPT-2024-0567",
    certificationExpiry: "2025-11-30",
    photos: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "r_008",
    name: "Gatsby Corner",
    address: "Athlone Stadium",
    city: "Cape Town",
    province: "Western Cape",
    cuisines: ["Gatsbys", "Cape Malay"],
    priceRange: "R",
    rating: 4.2,
    reviewCount: 198,
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop",
    isClaimed: false,
    isVerified: true,
    certificationBody: "MJC",
    certificationNumber: "MJC-CPT-2024-0890",
    certificationExpiry: "2025-02-28",
    photos: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop",
    ],
  },
];

export const mockReviews: Review[] = [
  {
    id: "rv_001",
    restaurantId: "r_001",
    restaurantName: "Bismillah Restaurant",
    userId: "u_001",
    userName: "Yusuf Patel",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    body: "Absolutely incredible lamb chops! The meat was perfectly seasoned and cooked to perfection. The staff were incredibly welcoming and the atmosphere was authentic. SANHA certified which gives peace of mind. Will definitely be coming back!",
    photos: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"],
    createdAt: "2024-01-15",
    likeCount: 24,
  },
  {
    id: "rv_002",
    restaurantId: "r_002",
    restaurantName: "Bo-Kaap Kitchen",
    userId: "u_002",
    userName: "Amina Jacobs",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4,
    body: "Authentic Cape Malay cuisine at its finest! The bobotie was just like my grandmother used to make. MJC certified and you can see the certificate displayed proudly. Service was a bit slow during peak hours but overall lekker experience.",
    photos: [],
    createdAt: "2024-01-12",
    likeCount: 18,
  },
  {
    id: "rv_003",
    restaurantId: "r_003",
    restaurantName: "Durban Spice",
    userId: "u_003",
    userName: "Ebrahim Moosa",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    body: "The best bunny chow I've ever tasted! Proper Durban style with that authentic spice. Fresh ingredients, generous portions. SANHA certified - you can verify the certificate number on their website. Highly recommend for anyone visiting Durban!",
    photos: [
      "https://images.unsplash.com/photo-1540914124281-342587941389?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop",
    ],
    createdAt: "2024-01-10",
    likeCount: 32,
  },
  {
    id: "rv_004",
    restaurantId: "r_006",
    restaurantName: "Tasty Halaal Burgers",
    userId: "u_004",
    userName: "Fatima Davids",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    body: "Finally, proper halaal burgers that taste amazing! The wagyu smash burger is out of this world. Great milkshakes too. SANHA certified with certificate displayed at the counter. Perfect spot for a casual dinner with friends.",
    photos: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"],
    createdAt: "2024-01-08",
    likeCount: 45,
  },
];

export const mockUsers: User[] = [
  {
    id: "u_001",
    fullName: "Yusuf Patel",
    email: "yusuf@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    bio: "Food enthusiast exploring halaal dining across Gauteng",
    reviewCount: 47,
    level: "Gold Foodie",
    joinedAt: "2023-06-15",
  },
  {
    id: "u_002",
    fullName: "Amina Jacobs",
    email: "amina@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    bio: "Passionate about discovering hidden halaal gems in Cape Town",
    reviewCount: 89,
    level: "Platinum Foodie",
    joinedAt: "2022-11-20",
  },
  {
    id: "u_003",
    fullName: "Ebrahim Moosa",
    email: "ebrahim@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    bio: "Durban curry specialist and bunny chow connoisseur",
    reviewCount: 156,
    level: "Diamond Foodie",
    joinedAt: "2022-03-10",
  },
];

export const mockMenuItems: MenuItem[] = [
  {
    id: "m_001",
    restaurantId: "r_001",
    name: "Lamb Chops",
    description: "Tender lamb chops marinated in special spices, grilled to perfection",
    price: 189.99,
    category: "Mains",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    isPopular: true,
  },
  {
    id: "m_002",
    restaurantId: "r_001",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and traditional spices",
    price: 149.99,
    category: "Mains",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    isPopular: true,
  },
  {
    id: "m_003",
    restaurantId: "r_001",
    name: "Seekh Kebab",
    description: "Minced lamb kebabs with herbs and spices, served with mint chutney",
    price: 129.99,
    category: "Starters",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
  },
  {
    id: "m_004",
    restaurantId: "r_001",
    name: "Vegetable Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas",
    price: 59.99,
    category: "Starters",
    isVegetarian: true,
  },
  {
    id: "m_005",
    restaurantId: "r_001",
    name: "Mango Lassi",
    description: "Refreshing yogurt drink blended with sweet mango",
    price: 49.99,
    category: "Drinks",
    isVegetarian: true,
  },
];

export const mockStaff: Staff[] = [
  {
    id: "s_001",
    restaurantId: "r_001",
    name: "Mohammed Farooq",
    role: "Head Chef",
    photoUrl: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&h=200&fit=crop",
  },
  {
    id: "s_002",
    restaurantId: "r_001",
    name: "Sarah Ahmed",
    role: "Restaurant Manager",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop",
  },
];

export const pricingTiers = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "ZAR",
    description: "Perfect for food lovers",
    features: [
      "Browse all restaurants",
      "Read reviews",
      "Save favorites",
      "Basic search filters",
      "Verify Halaal certificates",
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    price: 79,
    currency: "ZAR",
    description: "For serious foodies",
    features: [
      "Everything in Free",
      "Advanced search filters",
      "Early access to new restaurants",
      "Exclusive deals & discounts",
      "No ads",
      "Certificate expiry alerts",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    price: 499,
    currency: "ZAR",
    description: "For restaurant owners",
    features: [
      "Claim your restaurant",
      "Respond to reviews",
      "Analytics dashboard",
      "Menu management",
      "Promotions manager",
      "Certificate management",
      "Priority support",
    ],
    cta: "Contact Sales",
  },
];

export const foodieLevels = [
  { name: "Bronze Foodie", minReviews: 0, color: "bg-amber-600" },
  { name: "Silver Foodie", minReviews: 10, color: "bg-gray-400" },
  { name: "Gold Foodie", minReviews: 25, color: "bg-yellow-500" },
  { name: "Platinum Foodie", minReviews: 50, color: "bg-cyan-400" },
  { name: "Diamond Foodie", minReviews: 100, color: "bg-blue-500" },
];
