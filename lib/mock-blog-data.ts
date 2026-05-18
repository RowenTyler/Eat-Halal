export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  author: string;
  imageUrl: string;
}

export interface RecipePost {
  id: string;
  name: string;
  description: string;
  cookTime: string;
  imageUrl: string;
}

export interface VideoPost {
  id: string;
  title: string;
  description: string;
  duration: string;
  tag: string;
  imageUrl: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "b_001",
    title: "How Halal Restaurants Are Transforming South African Food Culture",
    excerpt:
      "Discover why halal dining is growing fast, how certification builds trust, and the stories behind the restaurants shaping the community.",
    category: "Featured Article",
    publishedAt: "May 12, 2026",
    author: "Eat Halal Admin",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop",
  },
  {
    id: "b_002",
    title: "The Story Behind the Most Popular Cape Malay Dishes",
    excerpt:
      "From fragrant spices to family recipes, learn how Cape Malay cuisine became one of the most beloved halal traditions in South Africa.",
    category: "Culture",
    publishedAt: "May 6, 2026",
    author: "Eat Halal Admin",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=900&fit=crop",
  },
  {
    id: "b_003",
    title: "5 Ways to Spot Genuine Halal Certification When Dining Out",
    excerpt:
      "A practical guide for consumers to verify halal claims, ask the right questions, and feel confident about every meal.",
    category: "Guide",
    publishedAt: "April 28, 2026",
    author: "Eat Halal Admin",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=900&fit=crop",
  },
  {
    id: "b_004",
    title: "How Restaurants Can Use Reviews to Build Loyalty",
    excerpt:
      "A look at how halal eateries can turn customer feedback into new menus, better service, and stronger community connections.",
    category: "Business",
    publishedAt: "April 20, 2026",
    author: "Eat Halal Admin",
    imageUrl:
      "https://images.unsplash.com/photo-1529692236671-f1b49f4f6d29?w=1200&h=900&fit=crop",
  },
];

export const recipes: RecipePost[] = [
  {
    id: "r_001",
    name: "Slow-Cooked Lamb Potjie",
    description:
      "A mouthwatering traditional recipe with rich spices and tender lamb for weekend family gatherings.",
    cookTime: "2 hrs",
    imageUrl:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=900&fit=crop",
  },
  {
    id: "r_002",
    name: "Spicy Bunny Chow at Home",
    description:
      "Recreate the iconic Durban street food with a rich chicken curry served inside a hollowed loaf.",
    cookTime: "45 min",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=900&fit=crop",
  },
];

export const videos: VideoPost[] = [
  {
    id: "v_001",
    title: "Inside South Africa’s Most Loved Halal Restaurant",
    description:
      "A short documentary style walkthrough of food, owners, and community at a top halal restaurant.",
    duration: "6:24",
    tag: "Restaurant Spotlight",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=900&fit=crop",
  },
  {
    id: "v_002",
    title: "Quick Recipe: Chicken Biryani for Beginners",
    description:
      "Step-by-step video showing how to make a fragrant biryani with halal ingredients at home.",
    duration: "4:11",
    tag: "Recipe Video",
    imageUrl:
      "https://images.unsplash.com/photo-1529692236671-f1b49f4f6d29?w=1200&h=900&fit=crop",
  },
];
