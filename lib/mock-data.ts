// Mock data for the Eat Halal application

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  city: string;
  cuisines: string[];
  priceRange: "$" | "$$" | "$$$" | "$$$$";
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isClaimed: boolean;
  isVerified: boolean;
  certificationBody?: string;
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

export const cuisineTypes = [
  "Indian",
  "Pakistani",
  "Middle Eastern",
  "Turkish",
  "Lebanese",
  "Moroccan",
  "Malaysian",
  "Indonesian",
  "Bengali",
  "Afghan",
  "Persian",
  "Egyptian",
  "Somali",
  "Nigerian",
  "Mediterranean",
  "Chinese",
  "Thai",
  "American",
  "Burgers",
  "Pizza",
  "Seafood",
  "Steakhouse",
  "BBQ",
];

export const mockRestaurants: Restaurant[] = [
  {
    id: "r_001",
    name: "Karim's Grill House",
    address: "12 High Street",
    city: "London",
    cuisines: ["Indian", "Pakistani"],
    priceRange: "$$",
    rating: 4.8,
    reviewCount: 342,
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "HMC",
    phone: "+44 20 1234 5678",
    website: "https://karimsgrill.com",
    photos: [
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop",
    ],
    featured: true,
    trending: true,
  },
  {
    id: "r_002",
    name: "Sultan's Palace",
    address: "45 Brick Lane",
    city: "London",
    cuisines: ["Turkish", "Middle Eastern"],
    priceRange: "$$$",
    rating: 4.6,
    reviewCount: 256,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "HFA",
    photos: [
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    ],
    featured: true,
  },
  {
    id: "r_003",
    name: "Beirut Kitchen",
    address: "78 Edgware Road",
    city: "London",
    cuisines: ["Lebanese", "Mediterranean"],
    priceRange: "$$",
    rating: 4.5,
    reviewCount: 189,
    imageUrl: "https://images.unsplash.com/photo-1540914124281-342587941389?w=800&h=600&fit=crop",
    isClaimed: false,
    isVerified: true,
    certificationBody: "HMC",
    photos: [
      "https://images.unsplash.com/photo-1540914124281-342587941389?w=800&h=600&fit=crop",
    ],
    trending: true,
  },
  {
    id: "r_004",
    name: "Moroccan Nights",
    address: "23 Portobello Road",
    city: "London",
    cuisines: ["Moroccan", "North African"],
    priceRange: "$$$",
    rating: 4.7,
    reviewCount: 178,
    imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    photos: [
      "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=800&h=600&fit=crop",
    ],
    featured: true,
  },
  {
    id: "r_005",
    name: "Spice Garden",
    address: "56 Green Street",
    city: "London",
    cuisines: ["Indian", "Bengali"],
    priceRange: "$",
    rating: 4.3,
    reviewCount: 234,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "HMC",
    photos: [
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&h=600&fit=crop",
    ],
    trending: true,
  },
  {
    id: "r_006",
    name: "Halal Burger Co",
    address: "89 Oxford Street",
    city: "London",
    cuisines: ["American", "Burgers"],
    priceRange: "$$",
    rating: 4.4,
    reviewCount: 456,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    certificationBody: "HFA",
    photos: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop",
    ],
    featured: true,
    trending: true,
  },
  {
    id: "r_007",
    name: "Persian Delights",
    address: "34 Kensington High St",
    city: "London",
    cuisines: ["Persian", "Middle Eastern"],
    priceRange: "$$$",
    rating: 4.9,
    reviewCount: 123,
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    isClaimed: true,
    isVerified: true,
    photos: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
    ],
  },
  {
    id: "r_008",
    name: "Malaysian Kitchen",
    address: "67 Chinatown",
    city: "London",
    cuisines: ["Malaysian", "Indonesian"],
    priceRange: "$$",
    rating: 4.2,
    reviewCount: 198,
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop",
    isClaimed: false,
    isVerified: false,
    photos: [
      "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&h=600&fit=crop",
    ],
  },
];

export const mockReviews: Review[] = [
  {
    id: "rv_001",
    restaurantId: "r_001",
    restaurantName: "Karim's Grill House",
    userId: "u_001",
    userName: "Ahmed Khan",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    body: "Absolutely incredible lamb chops! The meat was perfectly seasoned and cooked to perfection. The staff were incredibly welcoming and the atmosphere was authentic. Will definitely be coming back!",
    photos: ["https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop"],
    createdAt: "2024-01-15",
    likeCount: 24,
  },
  {
    id: "rv_002",
    restaurantId: "r_002",
    restaurantName: "Sultan's Palace",
    userId: "u_002",
    userName: "Fatima Ali",
    userAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 4,
    body: "Great Turkish cuisine with authentic flavors. The kebabs were delicious and the baklava was heavenly. Service was a bit slow during peak hours but overall a wonderful experience.",
    photos: [],
    createdAt: "2024-01-12",
    likeCount: 18,
  },
  {
    id: "rv_003",
    restaurantId: "r_003",
    restaurantName: "Beirut Kitchen",
    userId: "u_003",
    userName: "Omar Hassan",
    userAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    body: "The best hummus I've ever tasted outside of Lebanon! Fresh ingredients, generous portions, and the shawarma platter is a must-try. Highly recommend for anyone craving authentic Lebanese food.",
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
    restaurantName: "Halal Burger Co",
    userId: "u_004",
    userName: "Zara Mohammed",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    body: "Finally, proper halal burgers that taste amazing! The wagyu smash burger is out of this world. Great milkshakes too. Perfect spot for a casual dinner with friends.",
    photos: ["https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop"],
    createdAt: "2024-01-08",
    likeCount: 45,
  },
];

export const mockUsers: User[] = [
  {
    id: "u_001",
    fullName: "Ahmed Khan",
    email: "ahmed@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    bio: "Food enthusiast exploring halal dining across London",
    reviewCount: 47,
    level: "Gold Foodie",
    joinedAt: "2023-06-15",
  },
  {
    id: "u_002",
    fullName: "Fatima Ali",
    email: "fatima@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    bio: "Passionate about discovering hidden halal gems",
    reviewCount: 89,
    level: "Platinum Foodie",
    joinedAt: "2022-11-20",
  },
  {
    id: "u_003",
    fullName: "Omar Hassan",
    email: "omar@example.com",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    bio: "Middle Eastern cuisine specialist",
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
    price: 18.99,
    category: "Mains",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
    isPopular: true,
  },
  {
    id: "m_002",
    restaurantId: "r_001",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and traditional spices",
    price: 14.99,
    category: "Mains",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop",
    isPopular: true,
  },
  {
    id: "m_003",
    restaurantId: "r_001",
    name: "Seekh Kebab",
    description: "Minced lamb kebabs with herbs and spices, served with mint chutney",
    price: 12.99,
    category: "Starters",
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&h=300&fit=crop",
  },
  {
    id: "m_004",
    restaurantId: "r_001",
    name: "Vegetable Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas",
    price: 5.99,
    category: "Starters",
    isVegetarian: true,
  },
  {
    id: "m_005",
    restaurantId: "r_001",
    name: "Mango Lassi",
    description: "Refreshing yogurt drink blended with sweet mango",
    price: 4.99,
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
    description: "Perfect for food lovers",
    features: [
      "Browse all restaurants",
      "Read reviews",
      "Save favorites",
      "Basic search filters",
    ],
    cta: "Get Started",
  },
  {
    id: "pro",
    name: "Pro",
    price: 4.99,
    description: "For serious foodies",
    features: [
      "Everything in Free",
      "Advanced search filters",
      "Early access to new restaurants",
      "Exclusive deals & discounts",
      "No ads",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    price: 29.99,
    description: "For restaurant owners",
    features: [
      "Claim your restaurant",
      "Respond to reviews",
      "Analytics dashboard",
      "Menu management",
      "Promotions manager",
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
